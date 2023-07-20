import React from 'react';
import { useNavigate } from 'react-router-dom'

function ProjectItem({ id, image, name }) {
    const navigate = useNavigate()
    return (
        <div className='projectItem' onClick={() => {
            navigate('/projects/' + id)
        }}>
            
            <h1>{name}</h1>
        </div>
    )
}

export default ProjectItem