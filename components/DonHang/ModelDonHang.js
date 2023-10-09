const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_don_hang: { type: ObjectID },
    id_user: { type: String },
    id_chi_nhanh: { type: String },
    loai_don_hang: { type: String },
    dia_chi: { type: String },
    ngay_dat: { type: Date },
    ngay_giao: { type: Date },
    ngay_huy: { type: Date },
    ngay_nhan: { type: Date },
    san_pham:[{
        id_san_pham: { type: String },
        so_luong: { type: Number },
        gia: { type: Number },
    }],
    ghi_chu: { type: String },
    so_diem_tich_luy: { type: Number },
    giam_gia: { type: Number },
    phi_van_chuyen: { type: Number },
    tong_tien: { type: Number },
    status: { type: Number },
    so_sao: { type: Number },
    danh_gia: { type: String }
});

module.exports =mongoose.models.donhangs|| mongoose.model('donhang', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *