import React from 'react';
import ProjectItem from '../components/ProjectItem';
import { ProjectList } from '../helpers/ProjectList';
import Blob from '../components/Blob'; 
import '../styles/Projects.css';

function Projects() {
    return (
        <div className='projects'>
            <Blob color1='#ffbae5' color2='#ff8787'/>
            <h1>my personal projects</h1>
            <div className='projectList'>
                {ProjectList.map((project, index) => {
                    return <ProjectItem id={index} name={project.name} description={project.description} />
                })}
            </div>
        </div>
    )
}

export default Projects