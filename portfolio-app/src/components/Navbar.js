import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false);
    }, [location])

    return (
        <div className="navbar" id={expandNavbar ? "open" : "close"}>
            <div className="toggleButton">
                <button onClick={() => {
                    setExpandNavbar((prev) => !prev);
                }}>
                    X
                </button>
            </div>
            <div className="links">
                <Link to="/">home</Link>
                <Link to="/projects">projects</Link>
                <Link to="/resume">resume</Link>
            </div>
        </div>
    )
}

export default Navbar