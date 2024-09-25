import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = (token) => {

    if (!token) {
      token = Cookies.get("token");
    }

    if (token) {
      try {
        console.log("Token:", token);
        const decodedToken = jwtDecode(token);
        setIsAdmin(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  const signOut = () => {
    Cookies.remove("token"); // Remove the token from cookies
    setIsAdmin(false);
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    checkAdminStatus(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, checkAdminStatus, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
