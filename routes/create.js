var express = require('express');
var api = require('../apiCalls');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fabs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.fabVL, '');
  tecs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.tecVL, '');
  areas = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.areaVL, '');
  tecsd = {}
  fabsd = {}
  areasd = {}
  fabs.forEach(function(fab){
    fabsd[fab.RequestedObject.Id] = fab.RequestedObject.Name;
  });
  tecs.forEach(function(tec){
    tecsd[tec.RequestedObject.Id] = tec.RequestedObject.Name;
  });
  areas.forEach(function(area){
    areasd[area.RequestedObject.Id] = area.RequestedObject.Name;
  });

  res.render('create', { title: 'Nuevo Registro - Base de Conocimiento', sessionToken: req.query.st, fabsd: fabsd, tecsd: tecsd, areasd: areasd});
});

router.post('/', function(req, res, next) {
    attsJSON = JSON.parse(req.body.att);
    req.body.att = [];
    body = api.getContentBody(req.body, '');
    response = api.restAPICall(api.headersWAuth(req.body.st), 'POST', api.url+'/api/core/content', body);

    if (response.IsSuccessful){
      var contentId = response.RequestedObject.Id;

      if (attsJSON.filesNames.length > 0){
        var cont = 0;
        console.log(attsJSON);
        for (i = 0; i < attsJSON.filesNames.length; i++){
          content = api.restAPICall(api.headersWAuth(req.body.st), 'GET', api.url+'/api/core/content/'+contentId, '');

          console.log(content.RequestedObject.FieldContents[api.ids.att]);
          var values = content.RequestedObject.FieldContents[api.ids.att].Value;
          attBody = api.getAttachmentBody(attsJSON.filesNames[i], attsJSON.filesBytes[i]);
          console.log(attBody);
          options = {
              "url": api.url+'/api/core/content/attachment',
              "method": "POST",
              "headers": api.headersWAuth(req.body.st),
              "rejectUnauthorized": false,
              "body": JSON.stringify(attBody)
          }
          request(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              if (info.IsSuccessful){
                if (values){
                  values.push(info.RequestedObject.Id);
                } else {
                  values = [info.RequestedObject.Id];
                }
                body = api.getAttBody(contentId, values);
                response = api.restAPICall(api.headersWAuth(req.body.st), 'PUT', api.url+'/api/core/content', body);
                console.log(response);
                if (response.IsSuccessful){
                  cont++;
                  if (cont === attsJSON.filesNames.length){
                    res.render('create',{sessionToken: req.body.st, msg: 'Se ha creado el registro con exito', id: response.RequestedObject.Id});
                  }
                }
              } else {
                console.log(info);
              }
            }


          });
        }
      }
    } else if (response.StatusCode === 401){
      res.redirect(401, '/logout?st='+req.body.st);
    } else{
      res.render('search',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al crear el registro.'});
    }
});

module.exports = router;
