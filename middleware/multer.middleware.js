import multer from 'multer'

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const suffix = Date.now();
        console.log("filename from multer : ",file.originalname)
        cb(null, file.originalname+'-'+suffix)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/pdf'){
        cb(null, true)
    }
    else{
        cb(new Error("only jpeg/jpg/pdf files are accepted"))
    }
}

export const upload = multer({
    storage:storage,
    limits:{fileSize:5 * 1024 * 1024},
    fileFilter:fileFilter
})