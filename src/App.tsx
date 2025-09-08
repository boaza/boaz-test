import { useState, useEffect } from 'react';
import { AuthProvider, useAuth, AuthTemplate } from './auth/authContext';
import './App.css';

// This component demonstrates authentication usage
const AuthStatus = () => {
  const { user, logout, getAccessToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getAccessToken();
      setToken(accessToken);
    };
    
    fetchToken();
  }, [getAccessToken]);

  return (
    <div className="auth-status">
      <p>Welcome, {user?.name || 'User'}!</p>
      <button onClick={logout}>Logout</button>
      {token && (
        <div className="token-info">
          <h4>Access Token (first 30 chars):</h4>
          <code>{token.substring(0, 30)}...</code>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <div className="card">
          <h1>Boaz test app</h1>
          <AuthTemplate>
            <AuthStatus />
          </AuthTemplate>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
