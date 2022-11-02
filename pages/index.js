import React from 'react'
import classes from './index.module.css'
import Message from './components/message'
import Progress from './components/progress'
import IconButton from './components/iconbutton'
import Microphone from './components/microphone'
import MicrophoneOff from './components/microphoneOff'

import { getFilesFromUpload } from './lib/upload'
import { useStorage } from './lib/useStorage'

const sendData = async (file) => {

    let formData = new FormData()
    formData.append("file", file)

    const resp = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
    })

    return await resp.json()

}

const formatData = (data) => {

    return data.split("\n").filter(item => item.length > 0).filter(item => item.indexOf('[') === 0)

}

export async function getServerSideProps(context) {

    //const { params, req, res, query } = context;
    //console.log(params, query)

    const files = getFilesFromUpload()

    return {
        props: { prev: files },
    }
}

class Page extends React.Component {

    constructor(props) {

        super(props)

        this.audioRef = React.createRef()

        this.state = {
            data: this.props.prev || [],

            progress: 0,

            selected: '',
            error: false,
            started: false,

            sendStatus: 0,
        }

        this.timer = null
        this.mediaRec = null
        this.chunks = []

        this.storage = []
        this.sendFlag = false

        this.MAX_COUNT = 10
        this.RECORD_TIME = 30

        this.handlePlay = this.handlePlay.bind(this)
        this.handleStart = this.handleStart.bind(this)

        this.startTimer = this.startTimer.bind(this)

        this.handleStream = this.handleStream.bind(this)
        this.handleError = this.handleError.bind(this)
        this.handleData = this.handleData.bind(this)
        this.handleStop = this.handleStop.bind(this)

        this.procData = this.procData.bind(this)

        this.handleUnload = this.handleUnload.bind(this)
    }

    componentDidMount() {

        window.addEventListener('beforeunload', this.handleUnload)

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

            const options = { audio: true }
            navigator.mediaDevices.getUserMedia(options).then(this.handleStream).catch(this.handleError)

        } else {

            console.log("Media devices not supported")
            
            this.setState({
                error: true,
            })

        }

    }

    componentWillUnmount() {

        window.removeEventListener('beforeunload', this.handleUnload)

    }

    handleUnload(e) {
        e.preventDefault()
        //return this.storage.length > 0 ? e.returnValue = "There are still data being processed.\nAre you sure?" : true
        if(this.storage.length > 0) return
        e.returnValue = true
    }

    handleError(error) {
        
        this.setState({
            error: true,
        })
    }

    handleStream(stream) {

        this.mediaRec = new MediaRecorder(stream)
        this.mediaRec.addEventListener('dataavailable', this.handleData)
        this.mediaRec.addEventListener("stop", this.handleStop)

    }

    handleData(e) {
        
        this.chunks.push(e.data)

    }

    handleStop() {

        const blob = new Blob(this.chunks, {type: 'audio/webm;codecs=opus'})
        this.chunks = []

        var file = new File([blob], `file${Date.now()}.m4a`);

        this.storage.push(file)

        this.setState({
            sendStatus: 1,
        })

        //this.procData(file)
        this.procData()

        if(this.state.started) {
            
            if(this.storage.length >= this.MAX_COUNT) {
                
                clearInterval(this.timer)

                this.setState({
                    progress: 0,
                    started: false,
                })

            } else {

                this.chunks = []
                this.mediaRec.start()

            }

            //this.chunks = []
            //this.mediaRec.start()

        }
    }

    //procData(file) {
    procData() {

        if(this.sendFlag) return;

        const file = this.storage.pop()
        if(!file) {

            this.setState({
                sendStatus: 0,
            })

            return
        }

        this.sendFlag = true

        sendData(file).then(resp => {

            const _status = resp.status
            const _file = resp.file?.filename
            const _url = resp.file?.path
            const _out = resp.out

            if(_status === 200) {

                const items = formatData(_out)

                if(items.length > 0) {

                    let d = this.state.data.slice(0)

                    d.push({ id: _file, url: _url.replace('public/', '/'), texts: items })

                    this.setState({
                        data: d,
                    })

                }

            }

            this.sendFlag = false
            this.procData()

        }).catch(error => {
            console.log(error)
            this.sendFlag = false
            this.procData()
        })

    }

    startTimer() {

        const interval = Math.round((this.RECORD_TIME * 1000)/100)
        
        this.timer = setInterval(() => {

            let p = this.state.progress + 1

            if(p > 100) {
                this.mediaRec.stop()
                p = 0
            }

            this.setState({
                progress: p,
            })

        }, interval)

    }

    async handlePlay(id) {
        
        this.setState({
            selected: id,
        })

        const selitem = this.state.data.find(item => item.id === id)

        var audio = new Audio(selitem.url)
        audio.type = "audio/mp4"

        try {
            await audio.play()
        } catch(err) {
            console.log(err)
        }

        setTimeout(() => {

            this.setState({
                selected: '',
            })

        }, (this.RECORD_TIME * 1000))

    }

    handleStart() {

        if(this.state.error) return
        
        if(this.state.started) {

            clearInterval(this.timer)

            this.setState({
                progress: 0,
                started: false,
            })

            this.mediaRec.stop()

        } else {

            this.setState({
                progress: 0,
                started: true,
            })

            this.chunks = []
            this.mediaRec.start()

            this.startTimer()

        }

    }

    render() {

        const display_data = this.state.data.sort((a, b) => {
            if(a.id > b.id) return -1
            if(a.id < b.id) return 1
            return 0
        })

        return (
            <div className={classes.container}>
                <div className={classes.panelMessages}>
                    <div className={classes.listMessages}>
                    {
                        display_data.map((item) => {
                            return (
                                <Message 
                                key={item.id}
                                id={item.id}
                                texts={item.texts} 
                                mode={this.state.selected.length > 0 && this.state.selected === item.id ? 1 : 0} 
                                onClick={this.handlePlay} />
                            )
                        })
                    }
                    </div>
                </div>
                <div className={classes.panelControl}>
                    <div className={classes.panelLeft}>
                        <div className={this.state.sendStatus > 0 ? classes.indicator : classes.indicatorOff}></div>
                    </div>
                    <div className={classes.panelCenter}>
                        <div className={classes.centerContainer}>
                            <div className={classes.progress}>
                                <Progress value={this.state.progress} backgroundColor="#333" displayOff={true} lineWidth={5} />
                            </div>
                            <div className={classes.buttonCenter}>
                                <IconButton onClick={this.handleStart} size={32}>
                                    { this.state.error ? <MicrophoneOff color="#555" /> : <Microphone color={this.state.started ? "#FFD167" : "#555"} />}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className={classes.panelRight}>
                        <div className={classes.period}>{this.RECORD_TIME}s</div>
                    </div>
                </div>
                <audio ref={this.audioRef} controls style={{ display: 'none' }}></audio>
            </div>
        )
    }
}

export default Page