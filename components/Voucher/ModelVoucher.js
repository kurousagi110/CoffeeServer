const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id: {type : ObjectID}, //khóa chính
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    score: {type: Number,default: -1},
    positionX: {type: String, default: ""},
    positionY: {type: String, default: ""},
    positionZ: {type: String, default: ""},
    otp : {type: Number},
});

module.exports =mongoose.models.taikhoans|| mongoose.model('taikhoan', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *