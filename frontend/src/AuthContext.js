import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkCookie",
        {}, // Empty object for the request body
        {
          withCredentials: true, // This is the correct place for this option
        }
      );
      
      setIsAdmin(true);
    } catch (error) {
      console.error("Login failed:", error);
      setIsAdmin(false);
    }
  };

  const signOut = () => {
    Cookies.remove("token"); // Remove the token from cookies
    setIsAdmin(false);
  };

  useEffect(() => {
    const auth = async () => {
      await checkAdminStatus();
    };

    auth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAdmin, setIsAdmin, checkAdminStatus, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
