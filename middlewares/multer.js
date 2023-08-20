// store images

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/additionalPhotos')
    }
    ,
    filename: (req, file, cb) => {

      var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})


const upload = multer({ storage: storage })

export default upload;