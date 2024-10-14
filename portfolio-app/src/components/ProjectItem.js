import React from 'react';
import { useNavigate } from 'react-router-dom'

function ProjectItem({ index, id, description, name }) {
    const navigate = useNavigate()
    const itemDescID = id + "description";
    return (
        <div className='projectItem' onClick={() => {
            navigate('/projects/' + id)
        }} onPointerEnter={() => {
            document.getElementById(itemDescID).style.opacity = '1';
            document.getElementById(itemDescID).style.transitionDuration = '500ms';
        }} onPointerLeave={() => {
            document.getElementById(itemDescID).style.opacity = '0';
        }}>
            <div className='content'>
                <h1>{name}</h1>
                <p id={itemDescID} className='description'>{description}</p>
            </div>
        </div>
    )
}

export default ProjectItem