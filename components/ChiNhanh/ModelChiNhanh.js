const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_chi_nhanh: {type : ObjectID}, //khóa chính
    ten_chi_nhanh: {type: String},
    dia_chi: {type: String},
    ban: [{
        id_ban: {type: ObjectID},
        khu_vuc: {type: String},
        ten_ban: {type: String},
        trang_thai: {type: Number},
    }],
    location: {
        x: {type: String},
        y: {type: String}
    },
    status: {type: Number}
});

module.exports =mongoose.models.chinhanhs|| mongoose.model('chinhanh', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *