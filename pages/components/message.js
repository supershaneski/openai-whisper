import React from 'react'

import classes from './message.module.css'

import Play from './play'
import Pause from './pause'

import IconButton from './iconbutton'

import { getDateTimeFromMS } from '../lib/utils'

function removeHour(str) {
    let token = str.split(":")
    return token.length > 2 ? [token[1], token[2]].join(":") : [token[0], token[1]].join(":")
}

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

                    let tmp_time = token[0].replaceAll(',', '.')
                    tmp_time = tmp_time.slice(1)

                    let stoken = tmp_time.split(" --> ")
                    let time1 = stoken[0].trim()
                    let time2 = stoken[1].trim()

                    time1 = removeHour(time1)
                    time2 = removeHour(time2)

                    //const text_time = tmp_time + ']' //token[0] + ']'
                    const text_time = `[${time1} --> ${time2}]`
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