import  Qrcodemodel from '../../models/qrcode.js';
import jwtHelper from '../../helpers/jwt.js';
import messageHelper from '../../helpers/messages.js';
import responseHelper from '../../helpers/response.js';

const generateQrcode = async(req, res, next) => {
    try{ 
            //const uploadPath = req.body.qrgenType ==="image" ? req.file.path : req.body.qrcodeUrl;
            const uploadPath = req.body.qrgenType ==="image" ? req.file.location : req.body.qrcodeUrl;
            let responseData = { 
                imagePath: uploadPath 
                };
            
        //destructure the request body
         const {
             qrgenType
            
          } = req.body;

        let saveQrcode = await new Qrcodemodel({
            qrgenType,
            uploadPath
        }).save();
       // responseHelper.data(res, saveQrcode,  200, messageHelper.QRCODE_GENERATED);
      responseHelper.data(res, responseData, 200, messageHelper.QRCODE_GENERATED);

    } catch (error){
       throw error;
      // responseHelper.failure(res, error);
    }
}

export default {
    generateQrcode
}