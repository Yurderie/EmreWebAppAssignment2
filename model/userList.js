var mongoose = require("mongoose");
var mongodb = require('mongodb');

var userList = new mongoose.Schema({
    "username": String,
    "email": String,
    "password":String
   },

{
    collection:"userListTable"
});

module.exports = mongoose.model('user',userList);

