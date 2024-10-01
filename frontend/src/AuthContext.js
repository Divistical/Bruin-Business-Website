import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = (token) => {
    if (!token) {
      token = Cookies.get("token");
    }
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // Verify the token has isAdmin
        setIsAdmin(decodedToken.isAdmin); // Set the isAdmin value based on the decoded token
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    try {
        const response = await axios.post(
          "http://localhost:5000/api/signout",
          {}, // Empty object for the request body
          {
            withCredentials: true, // This is the correct place for this option
          }
        );
    }
    catch (error) {
      console.log("Sign out error:", error);
    }

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
