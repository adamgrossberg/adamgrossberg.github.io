import React from 'react';
import { useParams } from 'react-router-dom';
import {ProjectList} from '../helpers/ProjectList';
import GithubIcon from '@mui/icons-material/GitHub';
import '../styles/ProjectDisplay.css';

function ProjectDisplay() {
    const { id } = useParams();
    const project = ProjectList[id]
    return <div className='project'>
        <h1> {project.name} </h1>
        <p className='description'>{project.description}</p>
        <p>
            <b>skills:</b> {project.skills}
        </p>
        <a href={project.github} target="blank"><GithubIcon /></a>
    </div>
}

export default ProjectDisplay;