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
                        <label>Duration</label>
                        <select value={props.duration} onChange={(e) => props.onChangeDuration(e.target.value)}>
                            <option value={5}>5 seconds</option>
                            <option value={10}>10 seconds</option>
                            <option value={15}>15 seconds</option>
                            <option value={20}>20 seconds</option>
                            <option value={25}>25 seconds</option>
                            <option value={30}>30 seconds</option>
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