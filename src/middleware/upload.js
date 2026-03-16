// middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'images';
        if (!fs.existsSync(dir)) {  
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/\s+/g, "-");
        cb(null, Date.now() + "-" + originalName);
    }
});

const upload = multer({ storage: storage });

export default upload;