var express = require('express');
var request = require('request');
var api = require('../apiCalls');
var router = express.Router();

router.post('/', function(req, res, next) {
    body = api.getContentBody(req.body, req.body.id);
    options = {
      "url": api.url+'/api/core/content',
      "headers": api.headersWAuth(req.body.st),
      "method": 'PUT',
      "rejectUnauthorized": false,
      "body": JSON.stringify(body)
  }
  var reque = request(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        if (info.IsSuccessful){
          res.render('register',{sessionToken: req.body.st, msg: 'Se ha editado el registro con exito', id: info.RequestedObject.Id});
        } else if (response.StatusCode === 401){
          res.redirect(401, '/logout?st='+req.body.st);
        } else{
          res.render('search',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al editar el registro.'});
        }
      }else{
        console.log(error);
      }
    });
});

module.exports = router;
