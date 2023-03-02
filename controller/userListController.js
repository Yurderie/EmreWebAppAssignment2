// let express = require ('express');
// let router = express.Router();
// let mongoose = require('mongoose');
// let User = require('../model/userList');

// module.exports.displayUserList = (req,res,next)=>{
//     User.find((err,userList)=>{
//         if(err)
//         {
//         return console.error(err);
//         }
//         else
//         {
//          //console.log(BookList);
//          res.render('userList/list', 
//          {title:'User', UserList:userList,
//         displayName:req.user ? req.user.displayName:''});
//         }
//     });
// }

// module.exports.displayAddPage = (req,res,next)=>{
//     res.render('user/add',{title:'Add User',
//     displayName:req.user ? req.user.displayName:''})

// }

// module.exports.processAddPage = (req,res,next)=>{
//     let newUser = User({
//         "name": req.body.name,
//         "email":req.body.email,
//         "password":req.body.password,
//     });
//     User.create(newUser,(err,User)=>{
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//         res.redirect('/userList');
//         }
//     });
//     }


let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('../model/userList');
module.exports.displayUserList = (req,res,next)=>{
    User.find((err,userList)=>{
        if(err)
        {
        return console.error(err);
        }
        else
        {
         //console.log(BookList);
         res.render('userList/list', 
         {title:'UserList', UserList:userList,
         "contactName": null,
         "email": null,
         "contactNumber":null})
         //displayName:req.user ? req.user.displayName:''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('userList/add',{title:'Add Book',
    displayName:req.user ? req.user.displayName:''})

}

module.exports.processAddPage = (req,res,next)=>{
    let newUser = User({
        "contactName": req.body.contactName,
        "email":req.body.email,
        "contactNumber":req.body.contactNumber
    });
    User.create(newBook,(err,Book)=>{
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
    
        module.exports.displayEditPage = (req,res,next)=>{
            let id = req.params.id;
            User.findById(id,(err,userToEdit)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('userList/edit',{title:'Edit User', user: userToEdit,
                    displayName:req.user ? req.user.displayName:''});
                }
            
            });
        }

        module.exports.processEditPage = (req,res,next)=>{
            let id = req.params.id
            console.log(req.body);
            let updatedUser = User({
                "_id":id,
                "contactName":req.body.contactName,
                "email":req.body.email,
                "contactNumber":req.body.contactNumber
            });
            User.updateOne({_id:id}, updatedUser,(err)=>{
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

        module.exports.performDelete= (req,res,next)=>{
            let id = req.params.id;
            User.remove({_id:id},(err)=>{
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
        