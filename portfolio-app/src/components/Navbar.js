import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false);
        if (location.pathname === '/' || location.pathname === '/projects' || location.pathname === '/resume') {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
            document.documentElement.style.overflowX = 'hidden';
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
                    <Link to="/">Home.</Link>
                    <Link to="/projects">Projects.</Link>
                    <Link to="/resume">Résumé.</Link>
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