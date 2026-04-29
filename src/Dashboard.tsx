import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {
    fetch('http://localhost:3000/api/v1/auth/me', {
      credentials: 'include',
    }).then(r => r.json()).then(d => { if (d.status === 'success') setUser(d.data); });
  }, [navigate]);

  // Fetch profiles whenever filters change
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    const params = new URLSearchParams();
    if (gender) params.set('gender', gender);
    if (country) params.set('country_id', country.toUpperCase());
    params.set('limit', '20');

    fetch(`http://localhost:3000/api/v1/profiles?${params}`, {
      credentials: 'include',
    }).then(r => r.json()).then(d => {
      if (d.status === 'success') {
        setProfiles(d.data);
        setTotal(d.total);
      }
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    fetch(`http://localhost:3000/api/v1/profiles/search?q=${encodeURIComponent(searchQuery)}&limit=20`, {
      credentials: 'include',
    }).then(r => r.json()).then(d => {
      if (d.status === 'success') {
        setProfiles(d.data);
        setTotal(d.total);
      }
    });
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (gender) params.set('gender', gender);
    if (country) params.set('country_id', country.toUpperCase());

    fetch(`http://localhost:3000/api/v1/export/csv?${params}`, {
      credentials: 'include',
    }).then(r => r.blob()).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profiles.csv';
      a.click();
    });
  };

  const handleLogout = () => {
    fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => navigate('/'));
  };
  if (!user) return <div className="callback-page"><h2>Loading...</h2></div>;

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>Dashboard</h1>
        <div className="user-info">
          <img src={user.avatar_url} alt="avatar" />
          <span>{user.display_name}</span>
          <span className="role-badge">{user.role}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Try: young males from nigeria"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      {/* FILTERS */}
      <div className="filter-bar">
        <select className="filter-select" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          className="filter-input"
          placeholder="Country code (e.g. NG)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button className="search-btn" onClick={fetchProfiles}>Filter</button>
        <button className="export-btn" onClick={handleExport}>Export CSV</button>
      </div>

      <h2 className="section-title">Profiles ({total} results)</h2>
      {profiles.map((p) => (
        <div className="profile-card" key={p.id}>
          <div>
            <div className="profile-name">{p.name}</div>
            <div className="profile-details">{p.gender} · {p.age} years old</div>
          </div>
          <div className="profile-country">{p.country_name}</div>
        </div>
      ))}
    </div>
  );
}
