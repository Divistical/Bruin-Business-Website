import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import './css/About.css'

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="text-block">
        <h1>ABOUT US</h1>
        <p>
          Established in 2024, Bruin Business is UCLA's newest business
          organization managed by both undergraduate and graduate students. We
          are open to UCLA undergraduate and graduate students of all
          backgrounds and skill levels to join our growing community and share
          our love for business! <br /> <br /> Feel free to join us on LinkedIn,
          Instagram, and Facebook!
        </p>
        <h1>WHAT WE DO</h1>
        <p>
          At Bruin Business, our mission is to foster a thriving entreprenuerial community through a diverse 
          range of activities and initiatives. With events such as info sessions, workshops, speaker panels, networking,
          and startups, we strive to empower our members with a collaborative environment and tools needed to grow. We are
          open to everyone interested in business and entrepreneurship, regardless of major or experience!
        </p>
        <h1>HOW YOU CAN BE INVOLVED</h1>
        <p>
          Regardless of your major or background, we would love to have you at our open events!
          <br /> <br/>
          To keep up with our events, feel free to join us through following our newsletter, Instagram, Facebook, and LinkedIn!
        </p>
        <div style={{backgroundColor: "lightgrey"}}className="container">
        <p style={{fontSize: "50px"}} className="border">
         Join Bruin Business Today!
         <button className="button" onClick={() => navigate('/join-student')}> Join Now </button>
         <p style={{fontSize: "20px"}}>
          Become a part of our community and gain valuable skills and experiences.
         </p>
         </p>
         </div>
      </div>
      <Footer />
    </>
  );
}
