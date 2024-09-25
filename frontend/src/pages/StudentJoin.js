import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import './css/StudentJoin.css'

export default function StudentJoin() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>GENERAL MEMBERS</h1>
        <button className="button" onClick={() => navigate('/join-student')}> Apply Here </button>
        
        <h1>INTERNS</h1>
        <button className="button" onClick={() => navigate('/join-student')}> Apply Here </button>

        <h1>PROJECT MANAGERS</h1>
        <button className="button" onClick={() => navigate('/join-student')}> Apply Here </button>

        <h1>EXECUTIVES</h1>
        <button className="button" onClick={() => navigate('/join-student')}> Apply Here </button>
      </div>
      <Footer />
    </>
  );
}
