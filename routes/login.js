var express = require('express');
var api = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.query.st){
    res.render('login', { title: 'Login - Base de Conocimiento', logout: true});
  }
    res.render('login', { title: 'Login - Base de Conocimiento' });
});

router.post('/', function(req, res, next) {
    body = {
        "InstanceName":"DEV",
        "Username": req.body.username,
        "UserDomain":"",
        "Password": req.body.password
    }

    response = api.restAPICall(api.headers, 'POST', api.url+'/api/core/security/login', body);
    res.send(response);
});

module.exports = router;
