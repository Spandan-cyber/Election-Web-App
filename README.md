# 🇮🇳 ElectIndia: Interactive Election Guide

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=google-cloud&logoColor=white)](https://election-web-app-11120183339.us-central1.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Spandan-cyber/Election-Web-App)

**ElectIndia** is a premium, interactive web application designed to educate Indian citizens about the democratic process. Built with a stunning tricolor aesthetic, it combines modern web technology with AI-powered guidance to make civic education engaging and accessible.

---

## ✨ Key Features

- 🤖 **AI Election Assistant**: A context-aware chatbot powered by **Google Gemini AI** that answers complex questions about voter registration, EVMs, and constitutional processes.
- 🗳️ **Interactive Voting Guide**: A step-by-step visual walkthrough of the voting process in India.
- 🧠 **Educational Quiz**: Test your knowledge of Indian democracy with an interactive scoring system.
- 🗂️ **Election Flashcards**: Quick, bite-sized facts about Indian political history and processes.
- ⏳ **Election Timeline**: Explore the history of general elections in India.
- 🎨 **Premium UI/UX**: Responsive design featuring smooth Framer Motion animations and a sleek Indian flag-inspired theme.
- 🔒 **Secure Backend**: Express.js proxy server ensures API keys remain hidden and includes rate-limiting for security.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite-powered)
- **Framer Motion** (Animations)
- **Lucide React** (Iconography)
- **Vanilla CSS** (Custom Design System)

### Backend
- **Node.js & Express**
- **Google Generative AI SDK** (Gemini Pro)
- **Dotenv** (Environment Management)

### DevOps
- **Docker** (Containerization)
- **Google Cloud Run** (Serverless Hosting)
- **GitHub Actions** (CI/CD Ready)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Spandan-cyber/Election-Web-App.git
   cd Election-Web-App
   ```

2. **Install dependencies:**
   ```bash
   # Install root/frontend dependencies
   npm install

   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```

4. **Run the application:**
   ```bash
   # Start the backend (terminal 1)
   cd server
   node index.js

   # Start the frontend (terminal 2)
   npm run dev
   ```

---

## 📦 Deployment

This project is optimized for **Google Cloud Run**.

### Using Docker
The project includes a multi-stage `Dockerfile` that builds the React frontend and serves it via the Express backend.

```bash
gcloud run deploy election-web-app --source . --region us-central1 --allow-unauthenticated
```

---

## 🛡️ Security
- All AI processing is proxied through the backend.
- **Client-side never sees the API key.**
- Built-in rate limiting to prevent API abuse.
- Input sanitization on all user queries.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
*Developed with ❤️ for Indian Democracy.*
