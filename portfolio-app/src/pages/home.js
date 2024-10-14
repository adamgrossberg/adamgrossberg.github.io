import { React } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import GithubIcon from '@mui/icons-material/GitHub'
import Blob from '../components/Blob'
import Footer from '../components/Footer'
import ProjectItem from '../components/ProjectItem';
import { ProjectList } from '../helpers/ProjectList';
import resume from '../assets/resume.pdf';

import '../styles/Home.css';
import '../styles/Projects.css';
import '../styles/Blob.css';
import '../styles/Experience.css';
import '../styles/Education.css';


function Home() {
    return (
        <div className='home'>
            <Blob color1='green' color2='lightblue' />
            <div className='about'>
                <div className='introduction'>
                    <h2>Hi, I'm Adam.</h2>
                </div>
                <div className='prompt'>
                    <p>
                        I'm a computer science student at Georgia Tech with a desire to solve problems and make an impact.
                    </p>
                    <a href="https://www.linkedin.com/in/adamgrossberg" target="blank"><LinkedInIcon /></a>
                    <a href="mailto:adamgrossberg@gatech.edu"><EmailIcon /></a>
                    <a href="https://github.com/adamgrossberg?tab=repositories" target="blank"><GithubIcon /></a>
                    <div className='resume-prompt'>
                        Download my <a download='Adam T. Grossberg Resume' href={resume}>resume</a> here. Or, scroll.
                    </div>
                </div>
            </div>

            <div className='projects'>
                <h2>My projects.</h2>
                <div className='projectList'>
                {ProjectList.map((project, index) => {
                    return <ProjectItem index={index} id={project.key} name={project.name} description={project.description} />
                })}
                </div>
            </div>

            <div className='experience'>
                <h2>My experience.</h2>
                <div className='experienceItem'>
                    <p className='date'>May 2024 - August 2024</p>
                    <p className='location'>Remote</p>
                    <p className='role'>Advanced Group | Application Developer Intern</p>
                    <ul>
                        <li>Developed production-level features using Mendix for an enterprise Clinical Trial Management System.</li>
                        <li>Utilized Agile development methodologies with a global team of developers to complete requirements.</li>
                        <li>Performed exploratory testing and debugging in an enterprise C# Azure application, leading to improved performance and robustness.</li>
                    </ul>
                </div>
                <div className='experienceItem'>
                    <p className='date'>May 2024 - Present</p>
                    <p className='location'>Atlanta, GA</p>
                    <p className='role'>Georgia Tech Men’s Ultimate Frisbee | Team Captain</p>
                    <ul>
                        <li>Managed interview and selection process of team coaching staff.</li>
                        <li>Led discussions among leadership team to establish team values, ways of working, and organizational structure.</li>
                        <li>Spearheaded recruitment efforts to engage with new students and increase program campus presence.</li>
                        <li>Cultivated and exemplified team culture of accountability, resilience, communication, and performance.</li>
                    </ul>
                </div>
                <div className='experienceItem'>
                    <p className='date'>September 2019 - December 2023</p>
                    <p className='location'>Remote</p>
                    <p className='role'>Independent Tutor</p>
                    <ul>
                        <li>Created and delivered comprehensive lesson plans in Math, Physics, Programming, and Data Structures.</li>
                        <li>Tutored students of different levels, including multiple students with learning disabilities.</li>
                    </ul>
                </div>
            </div>

            <div className='education'>
                <h2>My education.</h2>
                <div className='experienceItem'>
                    <p className='date'>August 2022 - May 2026 (expected)</p>
                    <p className='school'>Georgia Institute of Technology | Atlanta, GA</p>
                    <p className='degree'>B.S. Computer Science | Threads in Intelligence and Info-Internetworks</p>
                    <p className='minors'>Fintech minor</p>
                    <ul className='info'>
                        <li>
                            Relevant coursework in Machine Learning, Data Structures and Algorithms, Algorithm Design and Analysis, Computer Organization and Programming, Computer Systems and Networks, Database Systems, Object Oriented Programming, Objects and Design.
                        </li>
                        <li>Summer 2023 - full semester study abroad in Berlin, Germany.</li>
                        <li>Dean's list, all semesters.</li>
                    </ul>
                    <p className='date'>August 2018 - June 2022</p>
                    <p className='school'>Wissahickon High School | Ambler, PA</p>
                    <ul className='info'>
                        <li>Computer Club Preident and Quiz Bowl team officer. Editorials editor of school newspaper. National Honors Society member.</li>
                        <li>Completed independent study in deep learning under supervision of faculty advisor.</li>
                        <li>Founded and captained nationally competitive school ultimate frisbee team. 2022 Pennsylvania state champions, seventh place at Nationals.</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    )
}
export default Home