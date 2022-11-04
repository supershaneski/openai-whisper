import nextConnect from 'next-connect'
import multer from 'multer'
import { exec } from 'child_process'
import getConfig from 'next/config'

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

const { serverRuntimeConfig } = getConfig()

apiRoute.post((req, res) => {

    const options = JSON.parse(req.body.options)
    
    const filename = req.file.path
    const outputDir = serverRuntimeConfig.PROJECT_ROOT + '/public/uploads'

    let sCommand = `whisper './${filename}' --model ${options.model} --language ${options.language} --task ${options.task} --output_dir '${outputDir}'`
    
    exec(sCommand, (err, stdout, stderr) => {
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