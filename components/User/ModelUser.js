const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const userSchema = new Schema({
    id_user: {type: ObjectID},
    tai_khoan: {type: String},
    email : {type: String},
    so_dien_thoai: {type: String},
    mat_khau: {type: String},
    ho_ten: {type: String},
    avatar: {type: String},
    dia_chi: [{
        id_dia_chi: {type: ObjectID},
        ten_dia_chi: {type: String},
        status: {type: Number},
    }],
    tich_diem: {type: Number},
    voucher_user: [{
        id_voucher: {type: String},
        ten_voucher: {type: String},
        gia_tri: {type: Number},
        ngay_bat_dau: {type: String},
        ngay_ket_thuc: {type: String},
        status: {type: Number},
    }],
    otp: {type: Number},
    status: {type: Number},
 });


module.exports =mongoose.models.users || mongoose.model('user', userSchema);