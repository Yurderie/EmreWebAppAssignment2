var express = require('express');
var router = express.Router();
let indexController = require('../controller/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.body.name_field;
  const email = req.body.email_field;
  const message = req.body.message_field;
  res.render('index', { title: 'Home' },
  
  
  );
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/Products', function(req, res, next) {
  res.render('Products', { title: 'Products' });
});

router.get('/Services', function(req, res, next) {
  res.render('Services', { title: 'Services' });
});

router.get('/Contact', function(req, res, next) {
  res.render('Contact', { title: 'Contact Information'});
});

router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

router.get('/register', indexController.displayRegisterPage);

/* POST Router for processing the register Page*/
router.post('/register', indexController.processRegisterPage);

module.exports = router;
