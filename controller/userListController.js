let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let userList = require('../model/userList');

module.exports.displayUserList = (req,res,next)=>{
    userList.find((err,userList)=>{
        if(err)
        {
        return console.error(err);
        }
        else
        {
         //console.log(BookList);
         res.render('userList/list', 
         {title:'User', UserList:userList,
        displayName:req.user ? req.user.displayName:''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('user/add',{title:'Add User',
    displayName:req.user ? req.user.displayName:''})

}

module.exports.processAddPage = (req,res,next)=>{
    let newUser = User({
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
    });
    User.create(newUser,(err,User)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
        res.redirect('/userList');
        }
    });
    }