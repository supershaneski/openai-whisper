openai-whisper
===========

This project was bootstrapped with [Next.JS](https://nextjs.org/) using manual setup.

# Motivation

This project is a coding exercise to explore [openai Whisper](https://openai.com/blog/whisper/), an automatic speech recognition (ASR) system.

It has been said that `Whisper` itself is [not designed to support ***real-time*** streaming tasks per se](https://github.com/openai/whisper/discussions/2) but it does not mean you cannot try, lol.

So this project is my attempt to make an ***almost real-time*** transcriber web application using openai `Whisper`.

I used `Next.js` so that I do not have to make separate backend and frontend apps.

As for the backend, I used `exec` to execute shell command invoking `Whisper`.

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

Basically, the app will record continuous 5 seconds of audio, upload it to the server, transcribe it and send the result back.
You can also play the uploaded audio file.
In my machine, even using `tiny` model takes time to transcribe the audio.

Please note that the uploaded files and transcribe output can easily increase in number inside the `upload` and `root` folder, respectively.

As for the code itself, I used `class component` (I know, I know...) because I had a difficult time to access `state variables` using hooks when I was developing. I started using `functional component` but decided later on refactored it to `class component`.

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
