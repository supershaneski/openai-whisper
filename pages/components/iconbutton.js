import React from 'react'
import classes from './iconbutton.module.css'

function IconButton({ disabled, children, size = 24, onClick }) {

    const handleClick = () => {
        if(!disabled) {
            onClick()
        }
    }

    return (
        <div className={classes.iconButton} onClick={handleClick} style={{
            width: `${size}px`,
            height: `${size}px`,
        }}>
        { children }
        </div>
    )
}

export default IconButton