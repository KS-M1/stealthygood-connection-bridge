
# Stealthy Good Connection Bridge

Stealthy Good Connection Bridge is a **MERN stack authentication system** that enables users to connect with multiple services (Gmail, HubSpot, Outlook, and Streak) and securely store their credentials in the **n8n automation platform**.

---

## 🚀 Features
- Multi-provider authentication (OAuth + API Key)
- Gmail & Outlook OAuth integration
- HubSpot & Streak API key authentication
- Auto-save credentials to n8n
- Built with React 18 (Vite) + Node.js/Express
- Simple and clean UI with vanilla CSS

---

## 🛠️ Tech Stack
**Frontend**
- React 18 with Vite  
- React Router DOM v6  
- Vanilla CSS  

**Backend**
- Node.js + Express.js  
- Axios for API requests  
- Nodemon for development  

**External Integrations**
- n8n workflow automation  
- OAuth Providers: Google (Gmail), Microsoft (Outlook)  
- API Key Providers: HubSpot, Streak  

---

## 📂 Project Structure
```
stealthy-good/
  ├── client/
  │   ├── src/
  │   │   ├── components/
  │   │   │   ├── common/
  │   │   │   │   ├── AppCard.jsx
  │   │   │   │   ├── AuthForm.jsx
  │   │   │   │   ├── SuccessPage.jsx
  │   │   │   ├── landing/
  │   │   ├── config/
  │   │   │   ├── apps.js
  │   │   ├── App.jsx
  │   │   ├── main.jsx
  │   │   ├── index.css
  │   ├── package.json
  │   ├── vite.config.js
  ├── server/
  │   ├── src/
  │   │   ├── routes/
  │   │   │   ├── auth.js
  │   │   ├── app.js
  │   │   ├── server.js
  │   ├── package.json
  │   ├── .env
```

---

## ⚙️ Environment Variables
The backend requires a `.env` file with the following keys:

```
PORT=5000
NODE_ENV=development

# Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
GOOGLE_SCOPE=https://www.googleapis.com/auth/gmail.readonly

# Microsoft
MS_CLIENT_ID=your_microsoft_client_id
MS_CLIENT_SECRET=your_microsoft_client_secret
MS_REDIRECT_URI=http://localhost:3000/oauth2callback
MS_SCOPE=offline_access Mail.Read

# n8n
N8N_API_URL=your_n8n_instance_url
N8N_API_KEY=your_n8n_api_key
N8N_GMAIL_CRED_TYPE=gmailOAuth2
N8N_HUBSPOT_CRED_TYPE=hubspotApi
N8N_OUTLOOK_CRED_TYPE=microsoftOutlookOAuth2Api
N8N_STREAK_CRED_TYPE=streakApi
```

---

## 🔑 Authentication Flows
- **OAuth Providers**: Gmail, Outlook → User logs in, tokens saved to n8n.  
- **API Key Providers**: HubSpot, Streak → User enters API key, saved directly to n8n.  

---

## 🖥️ Development Commands
**Frontend** (inside `/client`)  
```bash
npm install
npm run dev
npm run build
```

**Backend** (inside `/server`)  
```bash
npm install
npm run dev
node server.js
```

---

## 🐞 Known Issues & Fixes
- **Duplicate Gmail credentials** → Fixed by removing React StrictMode (double rendering).  
- **Port conflicts** → Ensure no other service uses port `5000` (macOS AirPlay often does).  
- **CORS errors** → Confirm Express CORS middleware is enabled.  

---

## 👨‍💻 Author
**Kumar shivam** (Patna, Bihar, India)  
📧 Email: n8n.official2025@gmail.com  
📞 Phone: +91 6201769233  

---

✨ Thank you for using **Stealthy Good Connection Bridge**!
