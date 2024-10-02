import './css/ProjectCard.css';

export default function ProjectCard({ image, name, startYear, endYear, description }) {
  // Placeholder image URL or SVG
  const placeholderImage = "https://via.placeholder.com/300"; // Example placeholder URL

  return (
    <div className="project-card">
      <img 
        src={image || placeholderImage} // Use the placeholder if no image is provided
        alt={name} 
        className="project-img" 
      />
      <div className="project-content">
        <h4 className="project-name">{name}</h4>
        <h5 className="project-duration">{startYear} - {endYear}</h5>
        <p className="project-description">{description}</p>
      </div>
    </div>
  );
}
