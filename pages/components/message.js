import React from 'react'

import classes from './message.module.css'

import Arrow from './arrow'

import IconButton from './iconbutton'

import Progress from './progress'

import { getDateTimeFromMS } from '../lib/utils'

function removeHour(str) {
    let token = str.split(":")
    return token.length > 2 ? [token[1], token[2]].join(":") : [token[0], token[1]].join(":")
}

function formatText(text) {
    
    const token = text.split("] ")

    let tmp_time = token[0].replaceAll(',', '.')
    tmp_time = tmp_time.slice(1)

    let stoken = tmp_time.split(" --> ")
    let time1 = stoken[0].trim()
    let time2 = stoken[1].trim()

    time1 = removeHour(time1)
    time2 = removeHour(time2)

    const text_time = `[${time1} --> ${time2}]`
    const text_text = token.length > 1 ? token[1] : ''

    return {
        duration: text_time,
        text: text_text,
    }

}

function Message({ id, texts, duration, mode, disabled, onClick }) {

    const [count, setCount] = React.useState(0)
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {

        let timer = null

        if(mode) {

            const interval = (duration * 1000)/100
            const delta = duration / 100

            timer = setInterval(() => {

                setCount(c => c + 1)
                setValue(v => v + delta)

            }, interval)

        }

        return () => {
            
            setCount(0)
            setValue(0)
            clearInterval(timer)
        }

    }, [mode, duration])

    let now = id.replace('tmp-file', '').replace('.m4a', '')
    let display_date = getDateTimeFromMS(now)
    let display_value = Math.round(10 * value)/10

    return (
        <div className={classes.message}>
            <div className={classes.datetime}>{ display_date }</div>
            <div className={classes.inner}>
                <div className={classes.text}>
                { texts.map((rawtext, index) => {

                    const { duration,  text } = formatText(rawtext)

                    return (
                        <p key={index} className={classes.item}>
                            <span className={classes.textTime}>{ duration }</span>
                            <span className={classes.textText}>{ text }</span>
                        </p>
                    )
                }) }
                </div>
                <div className={classes.action}>
                    <div className={classes.actionBottom}>
                        <Progress
                        value={count}
                        displayOff={true}
                        displayOther={true}
                        displayValue={display_value}
                        size={32}
                        lineWidth={2}
                        lineColor="#999"
                        backgroundColor="#444"
                        />
                    </div>
                    <div className={classes.actionTop}>
                        {
                            mode === 0 &&
                            <IconButton size={20} disabled={disabled} onClick={() => onClick(id)}>
                                <Arrow color="#999" />
                            </IconButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message