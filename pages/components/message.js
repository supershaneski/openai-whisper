import React from 'react'

import classes from './message.module.css'

import Play from './play'
import Pause from './pause'

import IconButton from './iconbutton'

function Message({ id, texts, mode, disabled, onClick }) {
    return (
        <div className={classes.message}>
            <p className={classes.text}>
            { texts.map((text, index) => {
                return (
                    <span key={index} className={classes.item}>{ text }</span>
                )
            }) }
            </p>
            <div className={classes.action}>
                <IconButton disabled={disabled} onClick={() => onClick(id)}>
                { mode > 0 ? <Pause color="#FFD167" /> : <Play color="#999" /> }
                </IconButton>
            </div>
        </div>
    )
}

export default Message