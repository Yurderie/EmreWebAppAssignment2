let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let userController = require('../controller/userListController');
//helper function for guard purposes
function requireAuth(req,res,next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
//connect to our book model
let User = require('../model/userList');
//let bookController = require('../controllers/book');
//GET ROUTE for the book list page - READ OPERATION
router.get('/',userController.displayUserList);
/*GET Route for displaying the Add page - CREATE operation*/
router.get('/add',requireAuth,userController.displayAddPage);

/*POST Route for processing the Add page - CREATE operation*/
router.post('/add',requireAuth,userController.processAddPage);



/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id',requireAuth,userController.displayEditPage);
/*POST Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id',requireAuth,userController.processEditPage);
/*GET to perform Deletion - DELETE operation*/
router.get('/delete/:id',requireAuth,userController.performDelete);
module.exports = router;