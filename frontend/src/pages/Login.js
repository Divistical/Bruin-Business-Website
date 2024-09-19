import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './css/Login.css'
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {checkAdminStatus, isAdmin, signOut } = useContext(AuthContext)

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log(response.data)
      const token = response.data.token
      localStorage.setItem("token", token);
      checkAdminStatus(token)
      setSuccessMessage("Successfully logged in!");
      setError(""); 
      
    } catch (err) {
      setError("Invalid credentials");
      setSuccessMessage(""); 
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccessMessage(""); 
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      if (response.status === 201) {
        setSuccessMessage("Successfully registered! You can now log in.");
        setIsRegistering(false); 
        setError(""); 
      }
    } catch (err) {
      setError("Error registering user");
      setSuccessMessage(""); 
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-body">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <form
          onSubmit={isRegistering ? handleSubmitRegister : handleSubmitLogin}
        >
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
          <br />
          {isRegistering && (
            <>
              <label>
                Confirm Password:
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <br />
            </>
          )}
          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
        <button className="switch" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </button>
        {isAdmin && (
          <button className="signout" onClick={signOut} style={{ marginTop: "20px" }}>
            Sign Out
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
