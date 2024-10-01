import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import AdminDashboard from "../components/AdminDashboard1";
import "./css/Home.css";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

const backend_link = process.env.REACT_APP_BACKEND_URL || ""; 
//import overlay file (overlay-content)

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const { isAdmin } = useContext(AuthContext); 

  const addSlide = async (formData) => {
    try {
      const response = await fetch(`${backend_link}/api/slides`, {
        method: "POST",
        body: formData,
      });
      const newSlide = await response.json();
      setSlides([...slides, newSlide]);
    } catch (error) {
      console.error("Error adding slide:", error);
    }
  };

  const toggleAdminDashboard = () => {
    setShowAdminDashboard(!showAdminDashboard);
  };

  return (
    <div className="page-container-home">
      <Navbar />
      <div className="overlay-content">
        <h1 style={{ color: "#003B5C"}}>Bruin Business</h1>
      </div>
      <div className="content-wrap">
        {isAdmin && (
          <>
            <button
              className="admin-toggle"
              onClick={toggleAdminDashboard}
              style={{ display: "block", position: "relative", zIndex: 10 }}
            >
              {showAdminDashboard
                ? "Hide Admin Dashboard"
                : "Show Admin Dashboard"}
            </button>
            {showAdminDashboard && <AdminDashboard addSlide={addSlide} />}
          </>
        )}
        <Slideshow />
      </div>
      <Footer />
    </div>
    
  );
}
