import { React, useEffect } from 'react';
import '../styles/Blob.css'

function Blob(color) {
    useEffect(() => {
        const blob = document.getElementById("blob");
        window.onpointermove = event => { 
        const { clientX, clientY } = event;
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
        }
    })
    const bgStyle = {
        background: 'linear-gradient(to right, ' + color.color1 + ', ' + color.color2 + ')'
    }
    return (
        <div>
            <div id='blob' style={bgStyle}></div>
            <div id='blur'></div>
        </div>
    )
}

export default Blob;