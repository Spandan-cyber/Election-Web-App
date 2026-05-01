import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// In production (Cloud Run), allow any origin since frontend is served by same server
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:8080',
  // Add your Cloud Run URL after first deploy:
  // 'https://electindia-xxxx-uc.a.run.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // In production, same-origin requests have no origin header
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json({ limit: '10kb' })); // Limit request body size

// Simple rate limiter — max 30 requests per minute per IP
const rateLimitMap = new Map();
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 1000;

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const requests = (rateLimitMap.get(ip) || []).filter(t => t > windowStart);
  if (requests.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }
  requests.push(now);
  rateLimitMap.set(ip, requests);
  next();
}

// Input validation & sanitization
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').trim().slice(0, 500); // Strip HTML, limit to 500 chars
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ElectIndia API proxy running' });
});

// Gemini proxy endpoint
app.post('/api/chat', rateLimiter, async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const safeMessage = sanitizeInput(message);
    if (!safeMessage) {
      return res.status(400).json({ error: 'Invalid message.' });
    }

    const safeHistory = typeof history === 'string' ? history.slice(0, 2000) : '';
    const safeContext = typeof context === 'string' ? context.slice(0, 200) : '';

    const apiKey = process.env.GEMINI_API_KEY; // NOT prefixed with VITE_ — stays server-side!
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert, friendly assistant for ElectIndia — an Indian election education platform. 
You help citizens understand elections, voting, and democratic processes in India.
Only answer questions related to Indian elections, voting, ECI, EVMs, political processes, or civic education.
If off-topic, politely redirect to election topics.
Keep responses concise, factual, and helpful. Use simple language.

${safeContext}${safeHistory ? `Recent conversation:
${safeHistory}

` : ''}User's question: ${safeMessage}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Serve built React frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// All non-API routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ ElectIndia server running on http://localhost:${PORT}`);
  console.log(`🔒 API key is secured server-side — never exposed to browser`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
