import express from 'express';
import multer from 'multer';
import { qrImgUpload } from '../helpers/aws.js';
import path from 'path';
import { verifyToken } from '../middlewares/userAuth.js';
import qrcodeController from '../controller/qrcode-arabic/index.js';

const router = express.Router();

const singleUpload = qrImgUpload.single("qrcodeFile");

//For localy storing uploaded images starts.....

// var storage = multer.diskStorage({
//     //here we can set the image upload folder path 
//     //this path will be within the node project folder (like server/uploads/qrcodes/)
//     destination: function (req, file, cb) {
//      cb(null, 'uploads/qrcodes/')
//     },
//     // By default, multer removes file extensions so let's add them back
//     filename: function (req, file, cb) {
//         //file.originalname will show the original image name
//       //path.extname(file.originalname) will get the extension of the file
//       //here any type of file saved in png format
//       cb(null, req.user.userId + '.png') 
//    } });
//   var upload = multer({ storage: storage });

//router.post('/generate-qrcode', verifyToken(), upload.single('qrcodeFile'), qrcodeController.generateQrcode);

//For localy storing uploaded images ends.....

router.post('/generate-qrcode', verifyToken(), function(req, res, next){
    singleUpload(req, res, function(err){
       next(err);
    });
}, qrcodeController.generateQrcode);


export default router;