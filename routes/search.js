var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.st);
  res.render('search', { title: 'Buscar - Base de Conocimiento', sessionToken: req.query.st });
});

module.exports = router;
