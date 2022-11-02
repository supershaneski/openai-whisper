import React from 'react'

import classes from './message.module.css'

import Play from './play'
import Pause from './pause'

import IconButton from './iconbutton'

import { getDateTimeFromMS } from '../lib/utils'

function Message({ id, texts, mode, disabled, onClick }) {

    let now = id.replace('tmp-file', '').replace('.m4a', '')
    let display_date = getDateTimeFromMS(now)

    //console.log("file", now, display_date)

    return (
        <div className={classes.message}>
            <div className={classes.datetime}>{ display_date }</div>
            <div className={classes.inner}>
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
        </div>
    )
}

export default Message