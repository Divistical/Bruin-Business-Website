import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './css/About.css'

export default function About() {
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
      </div>
      <Footer />
    </>
  );
}
