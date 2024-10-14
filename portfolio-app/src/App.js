import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import RoboticsAndPerception from './pages/projects/RoboticsAndPerception';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Routes id='routes' >
          <Route path="/" element={<Home />} />
          <Route path='/projects/robotics-and-perception' element={<RoboticsAndPerception />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
