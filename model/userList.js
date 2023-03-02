var mongoose = require("mongoose");
//var mongodb = require('mongodb');

var userList = new mongoose.Schema({
    "contactName": String,
    "email": String,
    "contactNumber":String
   },

{
    collection:"userListTable"
});

module.exports = mongoose.model('userList',userList);

