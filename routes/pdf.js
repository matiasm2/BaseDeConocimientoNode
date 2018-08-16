var express = require('express');
var api = require('../apiCalls');
var wkhtmltopdf = require('wkhtmltopdf');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        wkhtmltopdf('http://localhost:3000/export?st='+req.query.st+'&id='+req.query.id, {viewportSize: '1280x1024', pageSize: 'A4', "margin-top":0,"margin-bottom":0,"margin-left":0,"margin-right":0, encoding: 'UTF-8', debugJavascript: true }).pipe(res);
        setTimeout(function(){
            console.log('OK')
        },5000,'pdf');
        
    }catch(error) {
        console.error(error);
        res.send(error);
    }
  
});

module.exports = router;
