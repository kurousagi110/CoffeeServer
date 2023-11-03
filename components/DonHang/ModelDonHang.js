const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_don_hang: { type: ObjectID },
    id_user: { type: String },
    id_chi_nhanh: { type: String },
    loai_don_hang: { type: String },
    dia_chi: {
        ten_dia_chi: { type: String },
        so_dien_thoai: { type: String },
        so_nha: { type: String },
        tinh: { type: String },
        nguoi_nhan: { type: String },
    },
    ngay_dat: { type: Date },
    san_pham: [{
        id_san_pham: { type: String },
        ten_san_pham: { type: String },
        size: { type: String },
        so_luong: { type: Number },
        gia: { type: Number },
        topping: [{
            ten_topping: { type: String },
            gia: { type: Number },
        }],
    }],
    ghi_chu: { type: String },
    so_diem_tich_luy: { type: Number },
    giam_gia: { type: Number },
    phi_van_chuyen: { type: Number },
    tong_tien: { type: Number },
    ma_trang_thai: { type: Number },
    ten_trang_thai: { type: String },
    ngay_cap_nhat_0: { type: Date } ,
    ngay_cap_nhat_1: { type: Date } ,
    ngay_cap_nhat_2: { type: Date } ,
    ngay_cap_nhat_3: { type: Date} ,
    ngay_cap_nhat_4: { type: Date } ,
    ngay_cap_nhat_5: { type: Date } ,
    tong_san_pham: { type: Number },
    thanh_tien: { type: Number },
    so_sao: { type: Number },
    danh_gia: { type: String },
    hinh_anh_danh_gia: [{
        ten_hinh_anh: { type: String },
    }],
    email: { type: String },
    ten_user: { type: String },
    ngay_danh_gia: { type: Date },
    status: { type: Number },
});

module.exports = mongoose.models.donhangs || mongoose.model('donhang', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *