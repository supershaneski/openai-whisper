import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'

export function getFilesFromUpload() {

    const { serverRuntimeConfig } = getConfig()

    const uploadDir = 'uploads'

    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public', uploadDir)

    let files = fs.readdirSync(dir).filter(item => item.indexOf(".DS_Store") < 0)

    let srtfiles = files.filter(item => fs.existsSync(`${dir}/${item}.srt`))
    
    let prevData = srtfiles.map(item => {

        let id = item
        let url = `/uploads/${item}`
        
        let txt = fs.readFileSync(`${dir}/${item}.srt`, {encoding: 'utf8', flag: 'r'})

        let tokens = txt.split("\n")
        let texts = []

        let f = false
        let str = ''
        for (let i = 0; i < tokens.length; i++) {

            if(f) {

                str += ' ' + tokens[i]
                texts.push(str)

                f = false
                str = ''

            } else {

                // this is a crude way to detect the time range part
                if(tokens[i].indexOf('00:') >= 0) {
                    str = `[${tokens[i].trim()}]`
                    f = true
                }

            }

        }

        return {
            id,
            url,
            texts: texts,
        }

    })
    
    return prevData.filter(item => item.texts.length > 0)
}