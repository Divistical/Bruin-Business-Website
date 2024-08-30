import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import './css/Home.css'
import Footer from "../components/Footer";
import Overlay from "../components/Overlay";

export default function Home() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <Slideshow  />
      </div>

      <Footer />
    </div>
  );
}
