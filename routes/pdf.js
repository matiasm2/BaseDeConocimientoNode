var express = require('express');
var api = require('../apiCalls');
var wkhtmltopdf = require('wkhtmltopdf');
var router = express.Router();
var phantom = require('phantom');

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.viewportSize = { width: 1020}
                page.open('http://localhost:3000/export?st='+req.query.st+'&id='+req.query.id).then(function(status) {
                    page.render('register.pdf', {format: 'pdf', quality: '100'}).then(function(pdf){
                        res.download('register.pdf')
  
                    })
                });
            });
        });
         
/*
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open('http://localhost:3000/export?st='+req.query.st+'&id='+req.query.id).then(function(status) {
                    page.renderBase64('PNG').then(function(pdf){
                        res.send(pdf);
                    })
                });
            });
        });*/
        //wkhtmltopdf('http://localhost:3000/export?st='+req.query.st+'&id='+req.query.id, {viewportSize: '1280x1024', pageSize: 'A4', "margin-top":0,"margin-bottom":0,"margin-left":0,"margin-right":0, encoding: 'UTF-8' }).pipe(res);
    }catch(error) {
        console.error(error);
        res.send(error);
    }
  
});

module.exports = router;
