import React from 'react';
import ProjectItem from '../components/ProjectItem';
import { ProjectList } from '../helpers/ProjectList';
import Blob from '../components/Blob'; 
import '../styles/Projects.css';

function Projects() {
    return (
        <div className='projects'>
            <Blob color1='coral' color2='indianred'/>
            <h1>my personal projects</h1>
            <div className='projectList'>
                {ProjectList.map((project, index) => {
                    return <ProjectItem id={index} name={project.name} image={project.image} />
                })}
            </div>
        </div>
    )
}

export default Projects