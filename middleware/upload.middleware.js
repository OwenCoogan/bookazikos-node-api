const multer = require("multer");
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationDirectory= req.path.includes('post') === true ? 'post' : 'user';
    cb(null, __basedir + `/resources/static/assets/uploads/${destinationDirectory}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
let uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
