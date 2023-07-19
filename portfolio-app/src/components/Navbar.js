import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder'
import '../styles/Navbar.css';


function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false);
    }, [location])

    /*
    BUTTON CODE:
    
    */

    return (
        <div className="navbar" id={expandNavbar ? "open" : "close"}>
            <div className="links">
                <Link to="/">home</Link>
                <Link to="/projects">projects</Link>
                <Link to="/resume">resume</Link>
            </div>
            <div className="toggleButton" onClick={() => {
                setExpandNavbar(true);
                setTimeout(() => {
                    setExpandNavbar(false);
                }, 5000)
            }}>
                <button>
                    &rarr;
                </button>
            </div>
        </div>
    )
}

export default Navbar