import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Project from './pages/Project';
import Contact from './pages/Contact';
import None from './pages/None';
import StudentJoin from './pages/StudentJoin';
import BusinessJoin from './pages/BusinessJoin';

function App() {
  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='team' element={<Team />} />
          <Route path='projects' element={<Project />} />
          <Route path='contact' element={<Contact />} />
          <Route path='join-student' element={<StudentJoin />} />
          <Route path='join-business' element={<BusinessJoin />} />
          <Route path='*' element={<None />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
