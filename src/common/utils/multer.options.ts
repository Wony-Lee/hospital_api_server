import * as fs from "fs";
import * as path from "path";
import * as multer from "multer";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";


const createFolder = (folder: string) => {
    try {
        console.log('create uploads folder')

        fs.mkdirSync(path.join(__dirname, '..', 'uploads'))
    } catch(e) {
        console.error(e, 'the folder already exists...')
    }

    try {
        console.log(`create ${folder} uploads folder`)
        fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`))
    } catch(e) {
        console.error(`the ${folder} folder already exists`)
    }
}

const storage = (folder:string): multer.StorageEngine => {
    createFolder(folder)
    return multer.diskStorage({
        destination(req, file, cb) {
            console.log('destination', req, file, cb)
            const folderName = path.join(__dirname, '..', `uploads/${folder}`)
            cb(null, folderName)
        },
        filename(req, file, cb) {
            console.log('filename', req, file, cb)
            const ext = path.extname(file.originalname)
            const fileName = `${path.basename(
                file.originalname,
                ext
            )}${Date.now()}${ext}`
            cb(null, fileName)
        },
    })
}

export const multerOptions = (folder: string) => {
    console.log('multerOptions', folder)
    const result: MulterOptions = {
        storage: storage(folder),
        limits: { fileSize: 20 * 1024 * 1024 }
    }
    return result
}
