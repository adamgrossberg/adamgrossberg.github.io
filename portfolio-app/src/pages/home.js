import { React, useEffect } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import GithubIcon from '@mui/icons-material/GitHub'
import Blob from '../components/Blob'
import '../styles/Home.css'

function Home() {
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
    return (
        <div className='home'>
            <Blob id='blob'/>
            <div id='blur'></div>
            <div className='about'>
                <div className='introduction'>
                    <h2>hi, my name is adam.</h2>
                </div>
                <div className='prompt'>
                    <p>
                        i'm a computer science student with a passion for learning, creating, and collaborating.
                    </p>
                    <a href="https://www.linkedin.com/in/adamgrossberg" target="blank"><LinkedInIcon /></a>
                    <a href="mailto:adamgrossberg@gatech.edu"><EmailIcon /></a>
                    <a href="https://github.com/adamgrossberg?tab=repositories" target="blank"><GithubIcon /></a>
                </div>
            </div>
        </div>
    )
}
export default Home