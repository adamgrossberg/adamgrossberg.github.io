import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import GithubIcon from '@mui/icons-material/GitHub'
import '../styles/Home.css'

function Home() {
    return (
        <div className='home'>
            <div className='about'>
                <h2>Hi, my name is Adam.</h2>
                <div className='prompt'>
                    <p>
                        A computer science student with a passion for learning and creating.
                    </p>
                    <a href="https://www.linkedin.com/in/adamgrossberg" target="blank"><LinkedInIcon /></a>
                    <a href="mailto:adamgrossberg@gatech.edu"><EmailIcon /></a>
                    <a href="https://github.com/adamgrossberg?tab=repositories" target="blank"><GithubIcon /></a>
                </div>
            </div>
            <div className='skills'>
                <h1>Skills</h1>
                <ol className='list'>
                    <li className='item'>
                        <h2>Category</h2>
                        <span>Skills</span>
                    </li>
                    <li className='item'>
                        <h2>Category</h2>
                        <span>Skills</span>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Home