import multer from 'multer';

// Multer configuration for file uploads
const storage = multer.diskStorage({})

const upload = multer({ storage: storage });

export default upload;