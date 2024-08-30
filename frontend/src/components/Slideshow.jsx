import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import AdminDashboard from "./AdminDashboard1";
import "./Slideshow.css";

const backend_link = process.env.REACT_APP_BACKEND_URL || ""; 

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [slides, setSlides] = useState([]);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const { isAdmin } = useContext(AuthContext); 
  console.log(isAdmin);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${backend_link}/api/slides`);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

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

  useEffect(() => {
    fetchSlides();
  }, []);

  const NextSlide = () => {
    if (!sliding && slides.length > 0) {
      setSliding(true);
      setSlideDirection("left");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setSliding(false);
      }, 500);
    }
  };

  const PrevSlide = () => {
    if (!sliding && slides.length > 0) {
      setSliding(true);
      setSlideDirection("right");
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
        );
        setSliding(false);
      }, 500);
    }
  };

  useEffect(() => {
    const handleDown = (event) => {
      if (event.key === "ArrowLeft") {
        PrevSlide();
      } else if (event.key === "ArrowRight") {
        NextSlide();
      }
    };

    window.addEventListener("keydown", handleDown);

    return () => {
      window.removeEventListener("keydown", handleDown);
    };
  }, [slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      NextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  const toggleAdminDashboard = () => {
    setShowAdminDashboard(!showAdminDashboard);
  };

  return (
    <div className="slideshow-container">
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
      {slides.length > 0 && (
        <div className={`slide ${sliding ? `slide-${slideDirection}` : ""}`}>
          {slides[currentIndex].imageUrl &&
            (slides[currentIndex].linkUrl ? (
              <a
                href={slides[currentIndex].linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`data:image/jpeg;base64,${slides[currentIndex].imageUrl}`}
                  alt={`Slide ${currentIndex + 1}`}
                />
              </a>
            ) : (
              <img
                src={`data:image/jpeg;base64,${slides[currentIndex].imageUrl}`}
                alt={`Slide ${currentIndex + 1}`}
              />
            ))}
        </div>
      )}
      <button className="prev" onClick={PrevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={NextSlide}>
        &#10095;
      </button>
    </div>
  );
}
