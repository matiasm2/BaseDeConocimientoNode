var express = require('express');
var api = require('../apiCalls');
var router = express.Router();

router.post('/', function(req, res, next) {
    body = api.getContentBody(req.body, req.body.id);
    response = api.restAPICall(api.headersWAuth(req.body.st), 'PUT', api.url+'/api/core/content', body);
    console.log(response);
    if (response.IsSuccessful){
      res.render('register',{sessionToken: req.body.st, msg: 'Se ha editado el registro con exito', id: response.RequestedObject.Id});
    } else if (response.StatusCode === 401){
      res.redirect(401, '/logout?st='+req.body.st);
    } else{
      res.render('search',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al editar el registro.'});
    }
});

module.exports = router;
