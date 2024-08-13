import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberCard from "../components/MemberCard";
import './Team.css'
import { executives } from "../assets/teamdata";
import { managers } from "../assets/teamdata";
import { interns } from "../assets/teamdata";

export default function Team() {
  return (
    <>
      <Navbar />
      <h1>Executives</h1>
      <div className="card-container">
        {executives.map((item, index) => (
          <MemberCard
            key={index}
            image={item.image}
            position={item.position}
            name={item.name}
          />
        ))}
      </div>
      <h1>Project Managers</h1>
      <div className="card-container">
        {managers.map((item, index) => (
          <MemberCard
            key={index}
            image={item.image}
            position={item.position}
            name={item.name}
          />
        ))}
      </div>
      <h1>Interns</h1>
      <div className="card-container">
        {interns.map((item, index) => (
          <MemberCard
            key={index}
            image={item.image}
            position={item.position}
            name={item.name}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
