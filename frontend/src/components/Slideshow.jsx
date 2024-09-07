import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import AdminDashboard from "./AdminDashboard1";
import "./css/Slideshow.css";

const backend_link = process.env.REACT_APP_BACKEND_URL || "";

export default function Slideshow() {
  const { isAdmin } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${backend_link}/api/slides`);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleRemoveSlide = async (id) => {
    try {
      await axios.delete(`${backend_link}/api/slides/${id}`);
      setSlides((prevData) => prevData.filter((slide) => slide._id !== id));
    } catch (error) {
      console.error("Error removing slide:", error);
    }
  };

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
    if (slides.length > 1) {
      const interval = setInterval(() => {
        NextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  return (
    <div className="slideshow-container">
      {slides.length > 0 && (
        <div className={`slide ${sliding ? `slide-${slideDirection}` : ""}`}>
          {slides[currentIndex].imageUrl &&
            (slides[currentIndex].linkUrl ? (
              <div>
                {isAdmin && (
                  <div className="remove-container">
                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveSlide(slides[currentIndex]._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                )}
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
              </div>
            ) : (
              <div>
                {isAdmin && (
                  <div className="remove-container">
                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveSlide(slides[currentIndex]._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                )}
                <img
                  src={`data:image/jpeg;base64,${slides[currentIndex].imageUrl}`}
                  alt={`Slide ${currentIndex + 1}`}
                />
              </div>
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
