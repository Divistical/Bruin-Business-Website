import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './css/Contact.css';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>BUSINESS</h1>
        <p>
          For all business inquiries, please contact our "placeholder@bruinbusiness.com"
        </p>
        <h1>GENERAL</h1>
        <p>
          For all general questions, please reach out to us on any of our official accounts.
        </p>
      </div>
      <Footer />
    </>
  );
}
