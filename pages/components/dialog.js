import React from 'react'
import classes from './dialog.module.css'
import IconButton from './iconbutton'

function Dialog(props) {

    return (
        <div className={classes.dialog}>
            <div className={classes.header}>
                <h4 className={classes.title}>Settings</h4>
                <IconButton onClick={props.onClose}>
                    <div className={classes.times}><span>&times;</span></div>
                </IconButton>
            </div>
            <div className={classes.main}>
                <div className={classes.form}>
                    <div className={classes.item}>
                        <label>MinDecibels</label>
                        <select value={props.minDecibels} onChange={(e) => props.onChangeMinDecibels(e.target.value)}>
                            <option value={-70}>-70 dB</option>
                            <option value={-65}>-65 dB</option>
                            <option value={-60}>-60 dB</option>
                            <option value={-55}>-55 dB</option>
                            <option value={-50}>-50 dB</option>
                            <option value={-45}>-45 dB</option>
                            <option value={-40}>-40 dB</option>
                            <option value={-35}>-35 dB</option>
                            <option value={-30}>-30 dB</option>
                        </select>
                    </div>
                    <div className={classes.item}>
                        <label>MaxPause</label>
                        <select value={props.maxPause} onChange={(e) => props.onChangeMaxPause(e.target.value)}>
                            <option value={2000}>2000 ms</option>
                            <option value={2500}>2500 ms</option>
                            <option value={3000}>3000 ms</option>
                            <option value={3500}>3500 ms</option>
                            <option value={4000}>4000 ms</option>
                            <option value={4500}>4500 ms</option>
                            <option value={5000}>5000 ms</option>
                        </select>
                    </div>
                    <div className={classes.item}>
                        <label>Model</label>
                        <select value={props.model} onChange={(e) => props.onChangeModel(e.target.value)}>
                            <option value="tiny">Tiny</option>
                            <option value="tiny.en">Tiny.en</option>
                            <option value="base">Base</option>
                            <option value="base.en">Base.en</option>
                            <option value="small">Small</option>
                            <option value="small.en">Small.en</option>
                        </select>
                    </div>
                    <div className={classes.item}>
                        <label>Language</label>
                        <select value={props.language} onChange={(e) => props.onChangeLanguage(e.target.value)}>
                            <option value="Japanese">Japanese</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className={classes.item}>
                        <label>Task</label>
                        <select value={props.task} onChange={(e) => props.onChangeTask(e.target.value)}>
                            <option value="translate">Translate</option>
                            <option value="transcribe">Transcribe</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog