const { GridFsStorage } = require("multer-gridfs-storage");
const util = require("util");
const multer = require("multer");
const dbConfig = require("../../config/db");
const storage = new GridFsStorage({
	url: process.env.DB_URL ,
	options : { useNewParser : true, useUnifiedTopology: true},
	file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-image-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-image-${file.originalname}`
    };
  }
})

const uploadFiles = multer({ storage: storage }).array("file", 3);

const uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;