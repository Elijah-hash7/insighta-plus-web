import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      fetch('https://insighta-plus-backend-elijah-hash74986-5ek70nh0.leapcell.dev/api/v1/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            navigate('/dashboard');
          } else {
            setError('Login failed: ' + data.message);
          }
        })
        .catch(() => setError('Failed to connect to backend'));
    }
  }, [navigate]);

  return (
    <div className="callback-page">
      <h2>{error || 'Signing in with GitHub...'}</h2>
    </div>
  );
}
