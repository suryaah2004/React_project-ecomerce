import multer from "multer";
import fs from "fs";


const folder = "./uploads";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
  console.log("Uploads folder created");
}

const allowedTypes = /jpeg|jpg|png/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const mimeType = allowedTypes.test(file.mimetype);
  const ext = allowedTypes.test(
    file.originalname.toLowerCase().split(".").pop()
  );

  if (mimeType && ext) {
    cb(null, true); 
  } else {
    cb(new Error("Only .png, .jpg, .jpeg images are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter
});