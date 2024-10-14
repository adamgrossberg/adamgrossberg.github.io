import React from 'react';
import { useParams } from 'react-router-dom';
import {ProjectList} from '../helpers/ProjectList';
import GithubIcon from '@mui/icons-material/GitHub';
import '../styles/ProjectDisplay.css';

function ProjectDisplay() {
    const { index } = useParams();
    const project = ProjectList[index]
    return <div className='project'>
        <h1> {project.name} </h1>
        <p className='description'>{project.description}</p>
        <p>
            <b>Skills:</b> {project.skills}
        </p>
        <a href={project.github} target="blank"><GithubIcon /></a>
    </div>
}

export default ProjectDisplay;