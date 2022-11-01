import React from 'react'
import classes from './index.module.css'
import Message from './components/message'
import Progress from './components/progress'
import IconButton from './components/iconbutton'
import Microphone from './components/microphone'
import MicrophoneOff from './components/microphoneOff'

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

class Page extends React.Component {

    constructor(props) {

        super(props)

        this.audioRef = React.createRef()

        this.state = {
            data: [],

            progress: 0,

            selected: '',
            error: false,
            started: false,
        }

        this.timer = null
        this.mediaRec = null
        this.chunks = []

        this.handlePlay = this.handlePlay.bind(this)
        this.handleStart = this.handleStart.bind(this)

        this.startTimer = this.startTimer.bind(this)

        this.handleStream = this.handleStream.bind(this)
        this.handleError = this.handleError.bind(this)
        this.handleData = this.handleData.bind(this)
        this.handleStop = this.handleStop.bind(this)

        this.procData = this.procData.bind(this)
    }

    componentDidMount() {
        
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

        this.procData(file)

        if(this.state.started) {
            
            this.chunks = []
            this.mediaRec.start()

        }
    }

    procData(file) {

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

        }).catch(error => {
            console.log(error)
        })

    }

    startTimer() {
        
        this.timer = setInterval(() => {

            let p = this.state.progress + 1

            if(p > 100) {
                this.mediaRec.stop()
                p = 0
            }

            this.setState({
                progress: p,
            })

        }, 50)

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

        }, 5000)

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
            if(a.id > b.id) return 1
            if(a.id < b.id) return -1
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
                </div>
                <audio ref={this.audioRef} controls style={{ display: 'none' }}></audio>
            </div>
        )
    }
}

export default Page