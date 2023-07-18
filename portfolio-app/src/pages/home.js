import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import GithubIcon from '@mui/icons-material/GitHub'
import '../styles/Home.css'

function Home() {
    return (
        <div className='home'>
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