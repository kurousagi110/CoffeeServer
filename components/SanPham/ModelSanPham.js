const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_san_pham: {type : ObjectID}, //khóa chính
    ten_san_pham: {type: String},
    loai_san_pham:[{
        id: {type: ObjectID},
        ten_loai_san_pham: {type: String},
    }],
        size :[{
            id_size: {type: ObjectID},
            ten_size: {type: String},
            gia: {type: Number},
            giam_gia: {type: Number},
        }],
    mo_ta: {type: String},
    hinh_anh_sp:[{
        id_hinh_anh_sp: {type: ObjectID},
        hinh_anh_sp: {type: String},
    }],
    status: {type: Number},
});

module.exports =mongoose.models.sanphams|| mongoose.model('sanpham', schema);
//category => categories trong database
// 
//  * collections = table
//  * document = row
//  * field = column
//  *