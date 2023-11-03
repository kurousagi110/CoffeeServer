const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_voucher: { type: ObjectID },
    ten_voucher: { type: String },
    ma_voucher: { type: String },
    diem: { type: Number },
    giam_gia: {type: Number},
    gia_tri: { type: Number },
    mo_ta: { type: String},
    ngay_bat_dau: { type: Date },
    ngay_ket_thuc: { type: Date },
    trang_thai: { type: String },
    hinh_anh: { type: String },
    status: { type: Number },
});

module.exports =mongoose.models.vouchers|| mongoose.model('voucher', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *