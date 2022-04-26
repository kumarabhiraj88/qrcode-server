import  Qrcodemodel from '../../models/qrcode.js';
import jwtHelper from '../../helpers/jwt.js';
import messageHelper from '../../helpers/messages.js';
import responseHelper from '../../helpers/response.js';


import pdfFunc from './pdf-gen.js';
import fs from 'fs';
import utf8 from 'utf8';

import QRCode  from 'qrcode';



const generateQrcode = async(req, res, next) => {
    try{ 
        
         const uploadPath = req.body.qrgenType ==="image" ? req.file.location : req.body.qrcodeUrl;
            var invDefaultId='1';
        
			//local file root directory
			const {INIT_CWD} = process.env; // process.env.INIT_CWD 
			const rootPath =`${INIT_CWD}`;
			//qrcode generation starts...........................
			const TextToConvert = utf8.encode(rootPath+'/pdfs/'+invDefaultId+'.pdf');
			QRCode.toFile('./qrcodes/'+invDefaultId+'.png', TextToConvert, {
				// color: {
				//   dark: '#00F',  // Blue dots
				//   light: '#0000' // Transparent background
				// }
			  }, function (err) {
				if (err) throw err
				console.log('Qr code generated successfully');


				// pdf generation starts here................................
						
				pdfFunc.buildPdf(invDefaultId, uploadPath);

				//pdf generation ends here................................



			  })
			//qrcode generation ends.............................

			let responseData = { 
                qrCodePath: rootPath+'/qrcodes/'+invDefaultId+'.png'
                };

           
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