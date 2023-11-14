const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_san_pham: {type : ObjectID}, //khóa chính
    ten_san_pham: {type: String},
    loai_san_pham:[{
        id: {type: ObjectID},
        ma_loai_san_pham: {type: Number},
        ten_loai_san_pham: {type: String},
    }],
    size :[{
        id_size: {type: ObjectID},
        ten_size: {type: String},
        gia: {type: Number},
        giam_gia: {type: Number},
        gia_da_giam: {type: Number},
        isSelected: {type: Boolean},
    }],
    mo_ta: {type: String},
    hinh_anh_sp:[{
        id_hinh_anh_sp: {type: ObjectID},
        hinh_anh_sp: {type: String},
    }],
    danh_gia:[{
        so_sao: {type: Number},
        danh_gia: {type: String},
        hinh_anh_danh_gia:[{
            id_hinh_anh_danh_gia: {type: ObjectID},
            hinh_anh_danh_gia: {type: String},
        }],
        email: {type: String},
        ten_user: {type: String},
        ngay_danh_gia: {type: Date},
    }],
    tong_sao: {type: Number},
    so_luong_danh_gia: {type: Number},
    so_luong_da_ban: {type: Number},
    status: {type: Number},
    check_gia_giam: {type: Boolean},
    ngay_giam: {type: Date},
    is_san_pham_moi: {type: Boolean},
    ngay_san_pham_moi: {type: Date},
});

module.exports =mongoose.models.sanphams|| mongoose.model('sanpham', schema);
//category => categories trong database
// 
//  * collections = table
//  * document = row
//  * field = column
//  *