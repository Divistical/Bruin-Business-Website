import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import bruin from "../assets/bruinlogo.png";
import Footer from "../components/Footer";
import Overlay from "../components/Overlay";

export default function Home() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <Slideshow images={[bruin]} />
      </div>

      <Footer />
    </div>
  );
}
