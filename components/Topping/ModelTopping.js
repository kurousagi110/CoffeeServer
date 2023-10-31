const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id_topping : {type : ObjectID},
    ten_topping : {type : String},
    hinh_anh : [
        {
            id_hinh_anh_topping : {type : ObjectID},
            hinh_anh_topping : {type : String},
        }
    ],
    gia : {type : Number},
    mo_ta : {type : String},
    status : {type : Number},
    isSelected : {type : Boolean},
});


module.exports =mongoose.models.toppings|| mongoose.model('topping', schema);