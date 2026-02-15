export function renderLoginPage(params: {
  clientId: string;
  redirectUri: string;
  state?: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  scope: string;
  clientName?: string;
  error?: string;
}): string {
  const { clientId, redirectUri, state, codeChallenge, codeChallengeMethod, scope, clientName, error } = params;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generect MCP - Authorize</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #f5f5f7;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
      max-width: 400px;
      width: 100%;
      overflow: hidden;
    }
    .header {
      background: #2d59c8;
      color: white;
      padding: 28px;
      text-align: center;
    }
    .header h1 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .header p {
      font-size: 14px;
      opacity: 0.85;
    }
    .content {
      padding: 28px;
    }
    .error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px 14px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #2d59c8;
      box-shadow: 0 0 0 3px rgba(45, 89, 200, 0.1);
    }
    .hint {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }
    .hint a {
      color: #2d59c8;
      text-decoration: none;
    }
    .hint a:hover {
      text-decoration: underline;
    }
    .permissions {
      background: #f9fafb;
      border-radius: 8px;
      padding: 14px 16px;
      margin-bottom: 20px;
    }
    .permissions h3 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #374151;
    }
    .permission-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #4b5563;
      margin-bottom: 6px;
    }
    .permission-item:last-child {
      margin-bottom: 0;
    }
    .permission-icon {
      color: #2d59c8;
      font-weight: bold;
    }
    button {
      width: 100%;
      padding: 12px 20px;
      background: #2d59c8;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #2348a0;
    }
    button:active {
      background: #1e3d87;
    }
    .footer {
      text-align: center;
      padding: 16px 28px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Generect MCP</h1>
      <p>Authorize ${clientName || 'an application'} to access your Generect API</p>
    </div>
    
    <div class="content">
      ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
      
      <form method="POST" action="/oauth/authorize">
        <input type="hidden" name="client_id" value="${escapeHtml(clientId)}">
        <input type="hidden" name="redirect_uri" value="${escapeHtml(redirectUri)}">
        <input type="hidden" name="state" value="${escapeHtml(state || '')}">
        <input type="hidden" name="code_challenge" value="${escapeHtml(codeChallenge)}">
        <input type="hidden" name="code_challenge_method" value="${escapeHtml(codeChallengeMethod)}">
        <input type="hidden" name="scope" value="${escapeHtml(scope)}">
        
        <div class="permissions">
          <h3>This application will be able to:</h3>
          <div class="permission-item">
            <span class="permission-icon">&#10003;</span>
            <span>Access your Generect API account</span>
          </div>
          <div class="permission-item">
            <span class="permission-icon">&#10003;</span>
            <span>Search for leads and companies</span>
          </div>
          <div class="permission-item">
            <span class="permission-icon">&#10003;</span>
            <span>Use all other API endpoints using your API quota</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="api_token">Generect API Token</label>
          <input 
            type="password" 
            id="api_token" 
            name="api_token" 
            placeholder="Enter your API token"
            required
            autocomplete="off"
          >
          <div class="hint">
            Get your API token from <a href="https://beta.generect.com" target="_blank">beta.generect.com</a>
          </div>
        </div>
        
        <button type="submit">Authorize</button>
      </form>
    </div>
    
    <div class="footer">
      By authorizing, you allow this application to access your Generect API on your behalf.
    </div>
  </div>
</body>
</html>`;
}

export function renderErrorPage(params: {
  error: string;
  errorDescription?: string;
}): string {
  const { error, errorDescription } = params;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorization Error</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f7;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
      max-width: 400px;
      width: 100%;
      padding: 40px;
      text-align: center;
    }
    .error-icon {
      font-size: 40px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 20px;
      color: #dc2626;
      margin-bottom: 12px;
      font-weight: 600;
    }
    p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-icon">&#10060;</div>
    <h1>Authorization Error</h1>
    <p>${escapeHtml(errorDescription || error)}</p>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}