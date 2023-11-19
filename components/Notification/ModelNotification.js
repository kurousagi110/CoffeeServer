const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
  _id: { type: ObjectID }, //khóa chính
  id_user: { type: String },
  notification: [
    {
      _id: { type: ObjectID },
      image: { type: String },
      title: { type: String },
      message: { type: String },
      type: { type: String },
      isRead: { type: Boolean },
    },
  ],
});

module.exports =
  mongoose.models.notifications || mongoose.model("notification", schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *
