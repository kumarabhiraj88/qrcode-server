import mongoose from 'mongoose';

const qrcodeSchema = new mongoose.Schema({
    qrgenType: {
        type:String,
        required: true
    },
    uploadPath: {
        type:String,
        required: true
    }

},{ timestamps: true});

const qrcodes = mongoose.model('qrcode', qrcodeSchema);
export default qrcodes;