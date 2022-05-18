import * as fs from "fs";
import * as path from "path";
import * as multer from "multer";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { extname } from "path";


const createFolder = (folder: string) => {
    try {
        console.log('create upload folder')

        fs.mkdirSync(path.join(__dirname, '..', 'upload'))
    } catch(e) {
        console.error(e, 'the folder already exists...')
    }

    try {
        console.log(`create ${folder} upload folder`)
        fs.mkdirSync(path.join(__dirname, '..', `upload/${folder}`))
    } catch(e) {
        console.error(`the ${folder} folder already exists`)
    }
}

const storage = (folder:string): multer.StorageEngine => {
    createFolder(folder)
    return multer.diskStorage({
        destination(req, file, cb) {
            const folderName = path.join(__dirname, '..', `upload/${folder}`)
            cb(null, folderName)
        },
        filename(req, file, cb) {
            // const ext = path.extname(file.originalname)
            // const fileName = `${path.basename(
            //     file.originalname,
            //     ext
            // )}${Date.now()}${ext}`
            // cb(null, fileName)
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
        },
    })
}

export const multerOptions = (folder: string) => {
    const result: MulterOptions = {
        storage: storage(folder),
        limits: { fileSize: 20 * 1024 * 1024 }
    }
    return result
}
