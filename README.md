openai-whisper
===========

This project was bootstrapped with [Next.JS](https://nextjs.org/) using manual setup.

# Motivation

This project is a coding exercise to explore `openai` [Whisper](https://openai.com/blog/whisper/), an automatic speech recognition (ASR) system.

It has been said that `Whisper` itself is [not designed to support ***real-time*** streaming tasks per se](https://github.com/openai/whisper/discussions/2) but it does not mean we cannot try, vain as it may be, lol.

So this project is my attempt to make an ***almost real-time*** transcriber web application using openai `Whisper`.
The efficacy of which depends on how fast the server can transcribe/translate the audio.

I used `Next.js` so that I do not have to make separate backend and frontend apps.

As for the backend, I used `exec` to execute shell command invoking `Whisper`.
I have not yet find a way to `import` it as a `node.js` module.
All examples with `import` seem to be using `python` server.

```javascript
import { exec } from 'child_process'

exec(`whisper './${filename}' --model tiny --language Japanese --task translate`, (err, stdout, stderr) => {
    if (err) {
        console.log(err)
    } else {
        console.log(stdout)
        console.log(stderr)
    }
})
```

Notice I am just using the `tiny` model to perform super fast transcribing task.
This is all my system can handle otherwise it will come to a stand still.

## The App

![Screenshot](./public/screenshot.png "Screenshot")

Basically, the app will record continuous `5 seconds` (by default) of audio, upload it to the server, transcribe it using `Whisper` and send the result back.
You can edit the recordingperiod by editing `this.RECORD_TIME` variable.

At first, I was sending the audio data as it is created. 
However, this caused bottle-neck as transcribing takes time.
So I tried implementing a queue like approach, to only send data one at a time and wait until it finishes before sending another.

Please note that the uploaded files and transcribed output can easily increase in number inside the `upload` and `root` folder, respectively.
I will probably need to set a maximum count after which I automatically stop recording for safety purposes.

As for the code itself, I used `class component` (I know, I know...) because I had a difficult time to access `state variables` using hooks when I was developing.
I started using `functional component` but decided later on refactored it to `class component`.

There are still lots of things to do so this project is still a work in progress...

# Setup

First, you need to install [`Whisper`](https://github.com/openai/whisper) and its `Python`      dependencies

```sh
$ pip install git+https://github.com/openai/whisper.git
```

You also need `ffmpeg` installed on your system

```sh
# macos
$ brew install ffmpeg

# windows using chocolatey
$ choco install ffmpeg

# windows using scoop
$ scoop install ffmpeg
```

By this time, you can test `Whisper` using command line

```sh
$ whisper myaudiofile.ogg --language Japanese --task translate
```

If that is successful, you can proceed to install this app.

Clone the repository and install the dependencies

```sh
$ git clone https://github.com/supershaneski/openai-whisper.git myproject

$ cd myproject

$ npm install

$ npm run dev
```

Open your browser to `http://localhost:3006/` to load the application page.

## Using HTTPS

You might want to run this app using `https` protocol.
In order to do so, prepare the proper `certificate` and `key` files and edit `server.js` at the root directory.

Then run

```sh
$ node server.js
```

Now, open your browser to `https://localhost:3006/` to load the page.

