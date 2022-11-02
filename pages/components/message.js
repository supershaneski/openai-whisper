import React from 'react'

import classes from './message.module.css'

import Play from './play'
import Pause from './pause'

import IconButton from './iconbutton'

import { getDateTimeFromMS } from '../lib/utils'

function Message({ id, texts, mode, disabled, onClick }) {

    let now = id.replace('tmp-file', '').replace('.m4a', '')
    let display_date = getDateTimeFromMS(now)

    return (
        <div className={classes.message}>
            <div className={classes.datetime}>{ display_date }</div>
            <div className={classes.inner}>
                <div className={classes.text}>
                { texts.map((text, index) => {

                    const token = text.split("] ")
                    const text_time = token[0] + ']'
                    const text_text = token.length > 1 ? token[1] : ''

                    return (
                        <p key={index} className={classes.item}>
                            <span className={classes.textTime}>{ text_time }</span>
                            <span className={classes.textText}>{ text_text }</span>
                        </p>
                    )
                }) }
                </div>
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