import multer from 'multer';
import { extname } from 'path'

const validFileType = /jpeg|jpg|png|gif/;
const maxFileSize = 2000000 // 2MB - 2 * 1024 * 1024

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/asset/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const checkFileType = (fileInfo: Express.Multer.File | undefined, cb: multer.FileFilterCallback) => {
    const extName = validFileType.test(extname(fileInfo?.originalname || '').toLocaleLowerCase());
    const mimeType = validFileType.test(fileInfo?.mimetype || '');
    if (extName && mimeType) {
        cb(null, true)
    } else {
        cb(Error('Image should be of type png, jpg, jpeg and gif'));
    }
}

export const multerInstance = multer({
    storage: imageStorage,
    limits: { fileSize: maxFileSize },
    fileFilter: (_, file, cb) => checkFileType(file, cb)
}).single('upload');