const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_loai_san_pham: {type : ObjectID}, //khóa chính
    ma_loai_san_pham: {type: Number},
    ten_loai_san_pham: {type: String},
    hinh_anh: {type: String},
});

module.exports =mongoose.models.loaisanphams|| mongoose.model('loaisanpham', schema);
//category => categories trong database
// 
//  * collections = table
//  * document = row
//  * field = column
//  *