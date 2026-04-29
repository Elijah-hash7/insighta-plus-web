# Insighta Labs+ Web Portal

The web portal for Insighta Labs+ is a sleek, dynamic React dashboard built with Vite. It allows authorized users (Admins and Analysts) to log in, view demographic profiles, run natural language searches, and export data.

## Features
- **Stateless Authentication**: Uses GitHub OAuth with PKCE.
- **Maximum Security**: Tokens are **never** stored in `localStorage`. Instead, the backend issues **HTTP-Only, Secure cookies** ensuring immunity against XSS attacks.
- **CSRF Protection**: Works in tandem with the backend's CSRF configuration to prevent unauthorized cross-site requests.
- **Natural Language Search**: Type intuitive queries like "young males from nigeria" to filter data.
- **Premium UI**: Designed with modern aesthetics, dark mode by default, and responsive layouts.

## Setup & Local Development

### Prerequisites
- Node.js installed
- The Insighta Labs+ Backend must be running on `http://localhost:3000`

### Installation
```bash
git clone https://github.com/your-username/insighta-plus-web.git
cd insighta-plus-web
npm install
```

### Running the App
```bash
npm run dev
```
The app will open at `http://localhost:5173`.

## Architecture & Integration
This frontend exclusively utilizes the `/api/v1` versioned endpoints from the backend. 
Because cookies are used, all `fetch` requests include `credentials: 'include'` to allow the browser to automatically attach the HTTP-only access token.

- **Login**: `src/Login.tsx` redirects the user to GitHub.
- **Callback**: `src/Callback.tsx` intercepts the GitHub code and forwards it to the backend.
- **Dashboard**: `src/Dashboard.tsx` serves as the protected route, displaying profile data and handling searches/exports.
