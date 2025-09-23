// server/src/routes/auth.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const N8N_BASE = (process.env.N8N_API_URL || '').replace(/\/+$/, '');
const N8N_HEADERS = {
  'X-N8N-API-KEY': process.env.N8N_API_KEY,
  'Content-Type': 'application/json',
};

const saveCredentialToN8n = async (payload) => {
  if (!process.env.N8N_API_URL || !process.env.N8N_API_KEY) {
    throw new Error('n8n API configuration missing');
  }

  const { data } = await axios.post(`${N8N_BASE}/api/v1/credentials`, payload, {
    headers: N8N_HEADERS,
  });
  return data;
};

const postForm = async (url, params) => {
  const body = new URLSearchParams(params);
  const { data } = await axios.post(url, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
};

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth routes are working!',
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /api/auth/test',
      'POST /api/auth/gmail',
      'POST /api/auth/hubspot',
      'POST /api/auth/outlook',
      'POST /api/auth/streak',
      'POST /api/auth/callback',
      'GET /api/auth/health',
    ],
  });
});

// Gmail OAuth route (returns authUrl)
router.post('/gmail', (req, res) => {
  console.log("👉 Gmail route hit with body:", req.body);
  const { name, email } = req.body;
  console.log("✅ Generating Gmail OAuth URL for:", name, email);

  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(process.env.GOOGLE_CLIENT_ID)}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(process.env.GOOGLE_SCOPE)}&` +
    `response_type=code&` +
    `access_type=offline&` + // ensures refresh_token
    `prompt=consent&` + // ensures refresh_token consistently
    `state=${encodeURIComponent(JSON.stringify({ name, email, provider: 'gmail' }))}`;

  res.json({
    success: true,
    authUrl: googleAuthUrl,
    message: 'Gmail OAuth URL generated successfully',
    provider: 'gmail',
    userInfo: { name, email }
  });
});

// HubSpot API integration route - UPDATED (App Token schema)
router.post('/hubspot', async (req, res) => {
  console.log("👉 HubSpot route hit with body:", req.body);
  try {
    const { name, email } = req.body;
    const appToken = (req.body.apiToken || req.body.apiKey || '').trim(); // keep frontend as-is

    if (!appToken) {
      console.log("❌ No HubSpot token provided");
      return res.json({
        success: false,
        message: 'HubSpot Private App token is required',
        provider: 'hubspot',
        userInfo: { name, email },
      });
    }

    console.log("✅ Got HubSpot app token, saving to n8n...");
    const n8nCredentialData = {
      name: `Hubspot_${name || 'unknown'}_${email || 'unknown'}`,
      // If you overrode this via env, keep it. Otherwise default works on most n8n builds.
      type: process.env.N8N_HUBSPOT_CRED_TYPE || 'hubspotApi',
      data: {
        appToken: appToken,       // <- correct key for App Token
              // <- required by your schema (can be 'All' in UI)
      },
    };

    const saved = await saveCredentialToN8n(n8nCredentialData);
    console.log("🎉 HubSpot credentials saved to n8n:", saved);

    return res.json({
      success: true,
      message: 'HubSpot App Token saved successfully to n8n',
      provider: 'hubspot',
      userInfo: { name, email },
      credentialId: saved.id,
    });
  } catch (error) {
    console.error('HubSpot save error:', error.response?.data || error.message);
    return res.json({
      success: false,
      message: `Failed to save HubSpot credentials: ${error.response?.data?.message || error.message}`,
      provider: 'hubspot',
      userInfo: { name: req.body.name, email: req.body.email }, // fix the previous bug
    });
  }
});

// Outlook OAuth route (returns authUrl)
router.post('/outlook', (req, res) => {
  const { name, email } = req.body;
  const msClientId = process.env.MS_CLIENT_ID;
  const msRedirect = process.env.MS_REDIRECT_URI;
  const msScope = process.env.MS_SCOPE || 'offline_access Mail.Read';

  const microsoftAuthUrl =
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${encodeURIComponent(msClientId)}&` +
    `redirect_uri=${encodeURIComponent(msRedirect)}&` +
    `scope=${encodeURIComponent(msScope)}&` +
    `response_type=code&` +
    `response_mode=query&` +
    `prompt=consent&` + // encourage refresh token issuance
    `state=${encodeURIComponent(JSON.stringify({ name, email, provider: 'outlook' }))}`;

  res.json({
    success: true,
    authUrl: microsoftAuthUrl,
    message: 'Outlook OAuth URL generated successfully',
    provider: 'outlook',
    userInfo: { name, email }
  });
});

// Streak API integration route - UPDATED
router.post('/streak', async (req, res) => {
  console.log("👉 Streak route hit with body:", req.body);
  try {
    const { name, email } = req.body;
    const token = req.body.token || req.body.apiKey; // accept both

    if (!token) {
      console.log("❌ No token provided!");
      return res.json({ 
        success: false, 
        message: 'Streak API token is required',
        provider: 'streak',
        userInfo: { name, email }
      });
    }

    console.log("✅ Got Streak token, trying to save to n8n...");
    const n8nCredentialData = {
      name: `Streak_${name}_${email}`,
      type: process.env.N8N_STREAK_CRED_TYPE || 'streakApi',
      data: {
    apiKey: token,
    allowedDomains: "*"
  }
    };

    const saved = await saveCredentialToN8n(n8nCredentialData);
    console.log("🎉 Streak credentials saved to n8n:", saved);

    res.json({
      success: true,
      message: 'Streak API token saved successfully to n8n',
      provider: 'streak',
      userInfo: { name, email },
      credentialId: saved.id,
    });
  } catch (error) {
    console.error("🔥 Error saving Streak:", error.message);
    console.error('Streak save error:', error.response?.data || error.message);
    res.json({
      success: false,
      message: `Failed to save Streak credentials: ${error.response?.data?.message || error.message}`,
      provider: 'streak',
      userInfo: { name, email } = req.body
    });
  }
});

// OAuth Callback Handler (handles token exchange + saving)
router.post('/callback', async (req, res) => {
  try {
    let { code, state, provider } = req.body;

    if (!code) {
      return res.json({ success: false, message: 'Authorization code is required' });
    }

    // state can arrive as string or object (we expect object from client; safe-parse anyway)
    if (typeof state === 'string') {
      try {
        state = JSON.parse(state);
      } catch {
        // keep as-is if not JSON
      }
    }

    provider = provider || state?.provider;
    let tokens = {};
    let n8nPayload = null;

    if (provider === 'gmail') {
      console.log("👉 Gmail callback hit with code:", code, "state:", state);
      // Google token exchange (x-www-form-urlencoded)
      try {
        tokens = await postForm('https://oauth2.googleapis.com/token', {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        });
      } catch (err) {
        console.error('Google token exchange error:', err.response?.data || err.message);
        return res.json({ success: false, message: 'Failed to exchange code for Google tokens' });
      }

      if (!tokens.access_token) {
        return res.json({ success: false, message: 'Failed to get access token from Google' });
      }

      n8nPayload = {
        name: `Gmail_${state?.name || ''}_${state?.email || ''}`,
        type: process.env.N8N_GMAIL_CRED_TYPE || 'gmailOAuth2',
        data: {
          allowedDomains: "All",
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          oauthTokenData: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            scope: process.env.GOOGLE_SCOPE,
            token_type: tokens.token_type || 'Bearer',
            expires_in: tokens.expires_in,
          },
          sendAdditionalBodyProperties: false,
          additionalBodyProperties: {}
        },
      };
    }  else if (provider === 'outlook') {
  // Microsoft token exchange (x-www-form-urlencoded)
  try {
    tokens = await postForm('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      client_id: process.env.MS_CLIENT_ID,
      client_secret: process.env.MS_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.MS_REDIRECT_URI,
    });
  } catch (err) {
    console.error('Microsoft token exchange error:', err.response?.data || err.message);
    return res.json({ success: false, message: 'Failed to exchange code for Microsoft tokens' });
  }

  if (!tokens.access_token) {
    return res.json({ success: false, message: 'Failed to get access token from Microsoft' });
  }

 n8nPayload = {
    name: `Outlook_${state?.name || ''}_${state?.email || ''}`,
    type: 'microsoftOAuth2Api', // This is the correct type
    data: {
      clientId: process.env.MS_CLIENT_ID,
      clientSecret: process.env.MS_CLIENT_SECRET,
      // These are the EXACT field names n8n expects for Microsoft OAuth2
      allowedDomains: "All", // Must be "All" (string), not "*"
      // Remove userPrincipalName - it's not in the base credential
      oauthTokenData: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope || process.env.MS_SCOPE,
        token_type: tokens.token_type || 'Bearer',
        expires_in: tokens.expires_in,
      },
      sendAdditionalBodyProperties: false,
      additionalBodyProperties: {}
    },
  };
}
 else {
      return res.json({ success: false, message: 'Unknown provider in callback' });
    }

    // Save to n8n
    try {
      const saved = await saveCredentialToN8n(n8nPayload);
      return res.json({
        success: true,
        message: `${provider} credentials saved successfully to n8n`,
        provider: provider,
        userInfo: state,
        credentialId: saved.id,
      });
    } catch (n8nErr) {
      console.error('n8n API Error:', n8nErr.response?.data || n8nErr.message);
      return res.json({
        success: false,
        message: `Failed to save credentials to n8n: ${n8nErr.response?.data?.message || n8nErr.message}`,
      });
    }
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.json({ success: false, message: 'Internal server error' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Auth routes are healthy',
    timestamp: new Date().toISOString(),
    environment: {
      hasGoogleCredentials: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      hasMicrosoftCredentials: !!(process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET),
      hasN8nConfig: !!(process.env.N8N_API_URL && process.env.N8N_API_KEY),
    },
  });
});

module.exports = router;
