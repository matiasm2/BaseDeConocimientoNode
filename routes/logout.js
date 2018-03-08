var express = require('express');
var api = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    body = {
        "Value": req.query.st
    }
    headers = api.headersWAuth(req.query.st);
    response = api.restAPICall(headers, 'POST', api.url+'/api/core/security/logout', body);
    console.log(response);
    res.render('login', { title: 'Login - Base de Conocimiento', logout: true });
});

module.exports = router;
