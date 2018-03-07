var express = require('express');
var rest = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    body = {
        "Value": req.query.st
    }
    headers = rest.headersWAuth(req.query.st);
    response = rest.restAPICall(headers, 'POST', 'http://10.100.107.90/api/core/security/logout', body);
    console.log(response);
    res.render('login', { title: 'Login - Base de Conocimiento', login: false });
});

module.exports = router;
