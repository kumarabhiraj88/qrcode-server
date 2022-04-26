import aws from 'aws-sdk';
import  multer from 'multer';
import multerS3 from 'multer-s3';

import dotenv from 'dotenv';
dotenv.config();

import messageHelper from './messages.js';

const { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;


aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_BUCKET_REGION,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  
  //if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
  if (file.mimetype === 'application/pdf') {
      cb(null, true)
  } else {
     // cb(new Error('Invalid Mime Type, only JPEG, PNG and PDF'), false);
     cb(new Error('Invalid Mime Type, only PDF is allowed'), false);
  }
}
 //var s3url = "https://" + AWS_BUCKET_NAME +"s3"+ AWS_BUCKET_REGION + "amazonaws.com/" + req.user.userId + ".png"

//for single file upload
export const qrImgUpload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, req.user.userId + '.pdf')
    },
    limits:{fileSize: 3000000} //in bytes 3000000 bytes = 3mb
  })
})

