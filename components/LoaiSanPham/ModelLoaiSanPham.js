const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_loai_san_pham: {type : ObjectID}, //khóa chính
    ten_loai_san_pham: {type: String}
});

module.exports =mongoose.models.loaisanphams|| mongoose.model('loaisanpham', schema);
//category => categories trong database
// 
//  * collections = table
//  * document = row
//  * field = column
//  *