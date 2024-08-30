import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    checkAdminStatus(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, checkAdminStatus, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
