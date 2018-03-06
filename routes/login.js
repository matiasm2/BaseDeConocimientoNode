var express = require('express');
var rest = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login - Base de Conocimiento' });
});

router.post('/', function(req, res, next) {
    body = {
        "InstanceName":"DEV",
        "Username": req.body.username,
        "UserDomain":"",
        "Password": req.body.password
    }

    response = rest.restAPICall(rest.headers, 'POST', 'http://10.100.107.90/api/core/security/login', body);
    res.send(response);
});

module.exports = router;
