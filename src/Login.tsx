export default function Login() {
  const handleLogin = () => {
    const clientId = 'Ov23liCRMMDyz2topHAv';
    const redirectUri = 'http://localhost:5173/callback';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Insighta Labs</h1>
        <p>Sign in to access demographic intelligence.</p>
        <button className="login-btn" onClick={handleLogin}>Login with GitHub</button>
      </div>
    </div>
  );
}
