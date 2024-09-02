import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import './css/Home.css'
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="page-container-home">
      <Navbar />
      <div className="overlay-content">
        <h1 style={{fontSize: "100px"}}>Bruin Business</h1>
        <p>Work in Progress. <br/>Developed by Vincent Pham, Justin Nguyen, Jason Tran, and Christopher Nguyen.</p>
      </div> 
      <div className="content-wrap">
        <Slideshow  />
      </div>
      <Footer />
    </div>
  );
}
