const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_gio_hang: {type: ObjectID},
    id_user: {type: String},
    san_pham: [
        {
            id : {type: ObjectID},
            id_san_pham: {type: String},
            ten_san_pham: {type: String},
            size : {type: String},
            gia: {type: Number},
            so_luong: {type: Number},
            topping: [
                {
                    ten_topping: {type: String},
                    gia: {type: Number},
                }
            ]
        }
    ]
});

module.exports =mongoose.models.giohangs|| mongoose.model('giohang', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *