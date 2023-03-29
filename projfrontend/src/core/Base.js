import React from 'react'
import Menu from './Menu'

import "../style.css";

export default function ({
    title="My Title",
    description="My Description",
    className="text-white p-4",
    children
}) {
  return (
    <div>
        <Menu />
        <div className='container-fluid'>
            <div className='jumbotron text-white text-center m-3'>
                <h2 className='display-4'>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className='footer mt-auto py-3'>
            <div className='container-fluid bg-success text-white text-center py-3'>
                <h4>If you got any question feel free reach out!</h4>
                <button className='btn btn-warning btn-lg'>Contact Us</button>
            </div>
            <div className='container'>
                <span className='text-muted'>
                    An Amazing <span className='text-white'>MERN</span> Bootcamp
                </span>
            </div>
        </footer>
    </div>
    
  )
}
