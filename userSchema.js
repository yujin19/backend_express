"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

const UserListSchema = new Schema({
  firstname: String,
  lastname: String,
  sex: String,
  age: String,
  password: String
});

UserListSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserListSchema);
