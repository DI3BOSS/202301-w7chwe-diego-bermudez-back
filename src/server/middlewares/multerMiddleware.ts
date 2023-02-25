import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const fileNamePrefix = uuidv4;

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/avatars/");
  },
  filename(req, file, callback) {
    if (file.size < 2048) {
      callback(null, `${fileNamePrefix()}-${file.originalname}`);
    }
  },
});

const upload = multer({ storage });

export default upload;
