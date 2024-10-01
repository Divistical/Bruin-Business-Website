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
        <div class="container">
          <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSemptgQ34KOtvxrwJ9GCuAGGHM-KPTytShcv4HhvCszqpgKcg/viewform" target="_blank" rel="noopener noreferrer"> 
            Apply Here 
          </a>  
        </div>      
        <h1>INTERNS</h1>
        <div class="container">
           {/* <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSf--xH9d9ORttrJwnMVOivIiP8NGoZLLUdWL5U_sFqWU6IF9w/viewform" target="_blank" rel="noopener noreferrer">  
             Apply Here  
           </a>    */}
          <a className="button">
            APPLICATIONS CLOSED
          </a>
        </div>   
        <h1>PROJECT MANAGERS</h1>
        <div class="container">
          {/* <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSf--xH9d9ORttrJwnMVOivIiP8NGoZLLUdWL5U_sFqWU6IF9w/viewform" target="_blank" rel="noopener noreferrer"> 
            Apply Here 
          </a>   */}
          <a className="button">
            APPLICATIONS CLOSED
          </a>
        </div>   
        <h1>EXECUTIVES</h1>
        <div class="container">
          {/* <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSf--xH9d9ORttrJwnMVOivIiP8NGoZLLUdWL5U_sFqWU6IF9w/viewform" target="_blank" rel="noopener noreferrer"> 
            Apply Here 
          </a>   */}
          <a className="button">
            APPLICATIONS CLOSED
          </a>
        </div>   
      </div>
      <Footer />
    </>
  );
}
