import { useState, useEffect } from "react";
import './Slideshow.css';

export default function Slideshow({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');

    const NextSlide = () => {
        if (!sliding) {
            setSliding(true);
            setSlideDirection('left');
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setSliding(false);
            }, 500); 
        }
    };

    const PrevSlide = () => {
        if (!sliding) {
            setSliding(true);
            setSlideDirection('right');
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
                setSliding(false);
            }, 500); 
        }
    };

    useEffect(() => {
        const handleDown = (event) => {
            if (event.key === 'ArrowLeft') {
                PrevSlide();
            } else if (event.key === 'ArrowRight') {
                NextSlide();
            }
        };

        window.addEventListener('keydown', handleDown);

        return () => {
            window.removeEventListener('keydown', handleDown);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            NextSlide();
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow-container">
            <div className={`slide ${sliding ? `slide-${slideDirection}` : ''}`}>
                <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            </div>
            <button className="prev" onClick={PrevSlide}>&#10094;</button>
            <button className="next" onClick={NextSlide}>&#10095;</button>
        </div>
    );
}
