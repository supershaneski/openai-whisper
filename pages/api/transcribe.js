import nextConnect from 'next-connect'
import multer from 'multer'
import { exec } from 'child_process'

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => cb(null, `tmp-${file.originalname}`),
    }),
})

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({error: `Some error '${error}' happen`})
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' not allowed`})
    },
})

const uploadMiddleware = upload.single('file')

apiRoute.use(uploadMiddleware)

apiRoute.post((req, res) => {

    const filename = req.file.path

    exec(`whisper './${filename}' --model tiny --language Japanese --task translate`, (err, stdout, stderr) => {
        if (err) {
            res.send({ status: 300, error: err, out: null, file: null })
        } else {
            res.send({ status: 200, error: stderr, out: stdout, file: req.file })
        }
    })

})

export default apiRoute

export const config = {
    api: {
        bodyParser: false,
    }
}