var express = require('express');
var api = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    attachment = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/content/attachment/'+req.query.id, '');
    if (attachment.IsSuccessful){
        mimeType = api.getMymeType(attachment.RequestedObject.AttachmentName.split('.')[1]);
        var a = {"base64":'data:'+mimeType+';base64,'+attachment.RequestedObject.AttachmentBytes, "name": attachment.RequestedObject.AttachmentName};
        //var file = new File(attachment.RequestedObject.AttachmentBytes, a.name, {type:mimeType});

        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', "attachment; filename*=utf-8''" + encodeURIComponent(a.name));
        var decodedFile = new Buffer(attachment.RequestedObject.AttachmentBytes, 'base64');
        res.send(decodedFile);
        res.end();
  } else if (attachment.StatusCode === 401){
        res.redirect('/logout?st='+req.body.st);
  } else{
        res.render('search',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al buscar el archivo adjunto.'});
  }

});

module.exports = router;
