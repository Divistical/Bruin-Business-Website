import "./MemberCard.css";
import { useRef } from "react";
import useIntersectionObserver from "../useIntersectionObserver";

export default function MemberCard({ position, name, image }) {
  const ref = useRef();
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className={`member-card ${isVisible ? "visible" : ""}`}>
      <div className="image-container">
        {image ? (
          <img src={image} alt={name} className="member-image" />
        ) : (
          <div className="placeholder-circle"></div>
        )}
      </div>
      <div className="member-info">
        <p className="position">{position}</p>
        <p className="name">{name}</p>
        
      </div>
    </div>
  );
}
