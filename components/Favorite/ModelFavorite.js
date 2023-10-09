const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_favorite: {type : ObjectID}, //khóa chính
    id_user: {type: ObjectID},
    san_pham:[{
        id_san_pham: {type: ObjectID}
    }]
});

module.exports =mongoose.models.favorites|| mongoose.model('favorite', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *