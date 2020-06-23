const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { awsConfig } = require('../config/index');

aws.config.update({
secretAccessKey: "erLY7uycUFRNNfJI0SXRuZANDyDFptXqdNLQ4jVS",
accessKeyId: 'AKIATM3SF4WUM5HYJBFJ',
region: "us-east-2",
});

// aws.config.update({
//   secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
//   region: awsConfig.AWS_REGION,
// });

const s3 = new aws.S3();
 
const fileFilter = (req, file, cb) => {
 console.log("2")
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}
const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "pikagram-pics1",
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}.png`);
    },
  }),
});

module.exports = upload;