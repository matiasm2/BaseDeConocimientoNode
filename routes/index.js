var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if (!req.query.st){
    res.render('login', {title: 'Login - Base de Conocimiento', logout: true});
  }
    res.render('index', {sessionToken: req.query.st, title: 'Index- Base de Conocimiento'});
});


module.exports = router;