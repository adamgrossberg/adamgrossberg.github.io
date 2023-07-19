import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false);
    }, [location])

    const handleMouseEvent = (e) => {
        setExpandNavbar(false);
    };

    return (
        <div className="navbar" id={expandNavbar ? "open" : "close"} onMouseLeave={handleMouseEvent}>
            <div className="linksContainer">
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/projects">projects</Link>
                    <Link to="/resume">resume</Link>
                </div>
            </div>
            <div className="toggleButton" onClick={() => {
                setExpandNavbar((prev) => !prev);
            }}>
                <button>
                    &rarr;
                </button>
            </div>
        </div>
    )
}

export default Navbar