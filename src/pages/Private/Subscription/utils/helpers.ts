export const oauthSignIn = (): void => {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: 'http://localhost:5173/oauthcallback',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value'
  };

  const form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  for (const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
};
