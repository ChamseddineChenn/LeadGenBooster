import { useState, useEffect, useRef, useCallback } from 'react';
import { AuthContext } from './authContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const refreshTimeoutRef = useRef(null);

  // Decode JWT to get expiration time
  const getTokenExpiry = (token) => {
    if (!token) return null;
    try {
      const parts = token.split('.');
      const decoded = JSON.parse(atob(parts[1]));
      return decoded.exp * 1000;
    } catch {
      return null;
    }
  };

  // Clear refresh timeout
  const clearRefreshTimeout = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    clearRefreshTimeout();
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // continue logout even if endpoint fails
    }
    setAccessToken(null);
    setAdmin(null);
  }, [clearRefreshTimeout]);

  // Refresh access token before expiry
  const scheduleTokenRefresh = useCallback(
    (token) => {
      clearRefreshTimeout();
      const expiry = getTokenExpiry(token);
      if (!expiry) return;

      const refreshTime = expiry - Date.now() - 5 * 60 * 1000;

      if (refreshTime > 0) {
        // The setTimeout closure will capture current state
        refreshTimeoutRef.current = setTimeout(async () => {
          try {
            const res = await fetch(`${API_URL}/auth/refresh`, {
              method: 'POST',
              credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
              setAccessToken(data.accessToken);
              // Schedule next refresh for the new token
              scheduleTokenRefresh(data.accessToken);
            } else {
              handleLogout();
            }
          } catch {
            handleLogout();
          }
        }, refreshTime);
      }
    },
    [clearRefreshTimeout, handleLogout],
  );

  // Verify admin session
  const verifySession = useCallback(
    async (token) => {
      if (!token) {
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        } else {
          handleLogout();
        }
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    },
    [handleLogout],
  );

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
          scheduleTokenRefresh(data.accessToken);
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    checkSession();
  }, [scheduleTokenRefresh]);

  // Verify admin when accessToken changes
  useEffect(() => {
    verifySession(accessToken);
  }, [accessToken, verifySession]);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    setAccessToken(data.accessToken);
    scheduleTokenRefresh(data.accessToken);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout: handleLogout,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
