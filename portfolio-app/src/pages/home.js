import { React } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import GithubIcon from '@mui/icons-material/GitHub'
import Blob from '../components/Blob'
import '../styles/Home.css'

function Home() {
    return (
        <div className='home'>
            <Blob color1='aquamarine' color2='mediumpurple' />
            <div className='about'>
                <div className='introduction'>
                    <h2>Hi, my name is Adam.</h2>
                </div>
                <div className='prompt'>
                    <p>
                        I'm a computer science student with a passion for learning, creating, and collaborating.
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