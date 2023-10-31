const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_vong_quay : {type : ObjectID},
    ten_vong_quay : {type : String},
    mo_ta : {type : String},
    ten_voucher: {type: String},
    ma_voucher: {type: String},
    diem: {type: Number},
    gia_tri: {type: Number},
    ngay_bat_dau: {type: Date},
    ngay_ket_thuc: {type: Date},
    trang_thai: {type: String},
    hinh_anh: { type: String },
    status: {type: Number},
});


module.exports =mongoose.models.vongquays|| mongoose.model('vongquay', schema);