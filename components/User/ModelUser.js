const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const userSchema = new Schema({
    id_user: {type: ObjectID},
    ma_khach_hang: {type: String},
    tai_khoan: {type: String},
    email : {type: String},
    so_dien_thoai: {type: String},
    mat_khau: {type: String},
    ho_ten: {type: String},
    avatar: {type: String},
    dia_chi: [{
        id_dia_chi: {type: ObjectID},
        ten_dia_chi: {type: String},
        so_dien_thoai: {type: String},
        so_nha: {type: String},
        tinh: {type: String},
        mac_dinh: {type: Number},
        status: {type: Number},
        nguoi_nhan: {type: String},
    }],
    tich_diem: {type: Number},
    doi_diem:[{
        id_doi_diem: {type: ObjectID},
        ten_doi_diem: {type: String},
        ngay_doi: {type: String},
        so_diem: {type: Number}
    }],
    voucher_user: [{
        id_voucher: {type: String},
        ten_voucher: {type: String},
        ma_voucher: {type: String},
        diem: {type: Number},
        gia_tri: {type: Number},
        mo_ta: {type: String},
        ngay_bat_dau: {type: String},
        ngay_ket_thuc: {type: String},
        trang_thai: {type: Number},
        hinh_anh: { type: String },
        status: {type: Number},
    }],
    otp: {type: Number},
    status: {type: Number},
    lich_su: [{
        id_lich_su: {type: ObjectID},
        tu_khoa: {type: String},
    },]
 });


module.exports =mongoose.models.users || mongoose.model('user', userSchema);