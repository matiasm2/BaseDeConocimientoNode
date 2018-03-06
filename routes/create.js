var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Nuevo Registro - Base de Conocimiento' });
});

module.exports = router;
