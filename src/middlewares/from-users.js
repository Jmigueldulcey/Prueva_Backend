import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/client")
    },
    filename: (req, file, cb) => { 
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "user-" + uniqueSuffix + ".jpg"); 
    }
})

export const uploadUser = multer({storage});
