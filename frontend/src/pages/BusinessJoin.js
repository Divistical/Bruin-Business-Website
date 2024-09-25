import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './css/BusinessJoin.css'; 
import wordcollage from '../assets/wordcollage.jpg'

export default function BusinessJoin() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 style={{ fontWeight: 600, color: "black" }}> JOIN US </h1>
        <p>
          To continue our mission and expand our reach, join us as a sponsor!{" "}
          <br />
          For all business inquiries, please contact us{" "}
          <a href="mailto:support@bruinbusiness.com" style = {{ textDecoration: "underline"}}>here</a>
        </p>
        <img src={wordcollage} alt="Word collage" />
      </div>
      <Footer />
    </>
  );
}
