import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false);
        if (location.pathname === '/' || location.pathname === '/projects') {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [location])

    const handleMouseEvent = (e) => {
        setExpandNavbar(false);
    };

    return (
        <div className="navbar" id={expandNavbar ? "open" : "close"} onMouseLeave={handleMouseEvent}>
            <div className='menuText' id={clickedMenu ? "clicked" : "notClicked"}>(the menu)</div>
            <div className="linksContainer">
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/projects">projects</Link>
                    <Link to="/resume">resume</Link>
                </div>
            </div>
            <div className="toggleButton" onClick={() => {
                setClickedMenu(true);
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