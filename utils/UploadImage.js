const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const fileAdress = `${__dirname}/../Public/uploads/images/${year}/${month}/${day}`;
    require("fs").mkdirSync(fileAdress, { recursive: true });
    callback(null, fileAdress);
  },
  filename: (req, file, callback) => {
    const fileFormat = path.extname(file.originalname);
    callback(null, String(Date.now()) + fileFormat);
  },
});
const UploadImage = multer({ storage: storage });

module.exports = {
  UploadImage,
};
