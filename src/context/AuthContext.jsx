import { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import apiInstance from 'src/config/axios';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiInstance
      .get('/accounts/information')
      .then(res => res.data)
      .then(data => {
        console.log('User: ', data);
        setUser(data);
        setIsLoggedIn(true);
        setIsAdmin(data.is_admin);
        setIsSpecial(data.is_special);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const login = useCallback((access_token, refresh_token) => {
    setIsLoggedIn(true);
    localStorage.setItem('access-token', access_token);
    localStorage.setItem('refresh-token', refresh_token);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }, []);

  return (
    <authContext.Provider
      value={useMemo(
        () => ({
          login,
          logout,
          user,
          isLoggedIn,
          isAdmin,
          isSpecial,
        }),
        [login, logout, isLoggedIn, isAdmin, isSpecial, user]
      )}
    >
      {children}
    </authContext.Provider>
  );
}

const useAuth = () => useContext(authContext);

export default useAuth;
