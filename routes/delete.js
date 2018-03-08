var express = require('express');
var router = express.Router();
var api = require('../apiCalls');

/* GET users listing. */
router.get('/', function(req, res, next) {
  content = api.restAPICall(api.headersWAuth(req.query.st), 'DELETE', api.url+'//api/core/content/'+req.query.id, '');
  console.log(content);
  if (content.IsSuccessful){
    res.render('create', { title: 'Crear - Base de Conocimiento', sessionToken: req.query.st, id: '', msg: 'Se ha eliminado el registro exitosamente.' });
  }
});

module.exports = router;
