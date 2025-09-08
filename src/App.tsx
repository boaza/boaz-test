import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import './App.css';

// This component demonstrates authentication usage
const AuthStatus = () => {
  const { isAuthenticated, user, login, logout, getAccessToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessToken();
        setToken(accessToken);
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessToken]);

  return (
    <div className="auth-status">
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name || 'User'}!</p>
          <button onClick={logout}>Logout</button>
          {token && (
            <div className="token-info">
              <h4>Access Token (first 30 chars):</h4>
              <code>{token.substring(0, 30)}...</code>
            </div>
          )}
        </div>
      ) : (
        <button onClick={login}>Login with Microsoft</button>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <h1>Azure AD B2C Authentication</h1>
        <div className="card">
          <AuthStatus />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
