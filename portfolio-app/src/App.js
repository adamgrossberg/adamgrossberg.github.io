import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProjectDisplay from './pages/ProjectDisplay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar id='navbar' />
        <Routes id='routes' >
          <Route path="/" element={<Home />} />
          <Route path='/projects/:id' element={<ProjectDisplay />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
