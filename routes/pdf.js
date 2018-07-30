var express = require('express');
var api = require('../apiCalls');
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  wkhtmltopdf('http://localhost:3000/export?st='+req.query.st+'&id='+req.query.id, {viewportSize: '1280x1024', pageSize: 'A4' }).pipe(res);
});

router.post('/', function(req, res, next) {
    body = {
        "InstanceName":api.instanceName,
        "Username": req.body.username,
        "UserDomain":"",
        "Password": req.body.password
    }

    response = api.restAPICall(api.headers, 'POST', api.url+'/api/core/security/login', body);
    res.send(response);
});

module.exports = router;
