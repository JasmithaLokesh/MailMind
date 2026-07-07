# 📧 MailMind – AI Email Copilot

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow)

## Overview

MailMind is an AI-powered email copilot that transforms Gmail and Outlook into an intelligent workspace. It analyzes emails using AI to generate summaries, classify emails, detect deadlines, extract action items, calculate priority, detect spam, identify entities, analyze sentiment, and generate suggested replies.

## Features

### Authentication
- Email/password login
- Google OAuth
- Outlook OAuth
- Session management
- Password reset

### AI Features
- Email Classification
- AI Summarization
- Priority Scoring
- Deadline Extraction
- Action Item Detection
- Spam Detection
- Named Entity Recognition
- Sentiment Analysis
- Suggested Reply Generation

### Dashboard
- Inbox Synchronization
- Search & Filters
- Email Analytics
- Dark/Light Mode
- Priority Indicators

### Chrome Extension
- Gmail Analysis
- Outlook Analysis
- Sync Inbox
- Copy AI Reply
- Toast Notifications

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Python 3.11

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Extension
- Chrome Extension Manifest V3
- HTML
- CSS
- JavaScript

### AI
- Hugging Face Transformers
- PyTorch

## AI Models

| Task | Model |
|------|-------|
| Summarization | sshleifer/distilbart-cnn-12-6 |
| Sentiment | distilbert-base-uncased-finetuned-sst-2-english |
| Spam Detection | dima806/email-spam-detection-roberta |
| NER | dslim/bert-base-NER |

## Architecture

```
Chrome Extension
        │
        ▼
React Dashboard
        │
        ▼
FastAPI Backend
        │
 ┌──────┼─────────┐
 │      │         │
 ▼      ▼         ▼
Gmail Outlook PostgreSQL
 APIs    Graph
        │
        ▼
 AI Pipeline
```

## Project Structure

```
MailMind/
├── backend/
├── frontend/
├── extension/
└── README.md
```

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

Install PostgreSQL and create:

```sql
CREATE DATABASE mailmind;
```

Update `.env`:

```env
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/mailmind

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_REDIRECT_URI=
MICROSOFT_TENANT_ID=common
```

## AI Workflow

1. User authenticates.
2. Inbox sync starts.
3. Emails are downloaded.
4. Text preprocessing.
5. Classification.
6. Priority calculation.
7. Deadline extraction.
8. Summarization.
9. Action extraction.
10. Spam detection.
11. NER.
12. Sentiment analysis.
13. Suggested reply generation.
14. Results stored in PostgreSQL.
15. Dashboard and extension updated.

## Running

Backend:

```bash
uvicorn app.main:app --reload
```

Frontend:

```bash
npm run dev
```

Load the Chrome Extension using **Developer Mode → Load Unpacked**.

## Screenshots

Add screenshots for:
- Login
- Dashboard
- Email Details
- Chrome Extension
- AI Analysis

## Future Enhancements

- Yahoo Mail
- Attachment summarization
- Calendar integration
- Smart reminders
- Mobile app

## Troubleshooting

- Ensure PostgreSQL is running.
- Verify OAuth credentials.
- Run backend before frontend.
- Hugging Face models download automatically on first run.

## License

MIT License

## Author

**Jasmitha Lokesh**

MailMind demonstrates secure authentication, AI-powered email analysis, browser extension development, and full-stack engineering using modern technologies.
