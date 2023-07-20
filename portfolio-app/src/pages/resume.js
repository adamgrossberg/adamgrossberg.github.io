import React from 'react';
import '../styles/Resume.css'
import resume from '../assets/resume.pdf'
import Blob from '../components/Blob'

function Resume() {
    return (
        <div className='resume'>
            <Blob color1='#ffff73' color2='#ffc526' />
            <div className='download'>
                <a download='Adam T. Grossberg Resume.pdf' href={resume}>download my <span id='resText'>resume</span>!</a>
            </div>
            <p>(still working on this page)</p>
        </div>
    )
}

export default Resume