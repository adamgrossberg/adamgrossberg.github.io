import React from 'react';
import '../styles/Resume.css'
import resume from '../assets/resume.pdf'

function Resume() {
    return (
        <div className='resume'>
            <div className='download'>
                <a download='Adam T. Grossberg Resume.pdf' href={resume}>download my resume!</a>
            </div>
        </div>
    )
}

export default Resume