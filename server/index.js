import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Only allow requests from your frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  // Add your production domain here when deploying:
  // 'https://yourdomain.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
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

app.listen(PORT, () => {
  console.log(`✅ ElectIndia proxy server running on http://localhost:${PORT}`);
  console.log(`🔒 API key is secured server-side — never exposed to browser`);
});
