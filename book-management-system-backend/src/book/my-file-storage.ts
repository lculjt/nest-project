import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirPath = './uploads';
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

export {
    storage
}