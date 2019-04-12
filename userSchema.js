"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var mongoosePaginate = require("mongoose-paginate");
var mongoosePaginate2 = require("mongoose-paginate-v2");

const UserListSchema = new Schema({
  firstname: String,
  lastname: String,
  sex: String,
  age: String,
  password: String
});

//UserListSchema.plugin(mongoosePaginate);
UserListSchema.plugin(mongoosePaginate2);
module.exports = mongoose.model("User", UserListSchema);
