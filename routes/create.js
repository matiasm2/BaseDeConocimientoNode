var express = require('express');
var api = require('../apiCalls');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fabs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.fabVL, '');
  tecs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.tecVL, '');
  //areas = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.areaVL, '');
  if(fabs.StatusCode === 401 || tecs.StatusCode === 401 /*|| areas.StatusCode === 401*/){
    res.redirect('/logout?st='+req.query.st);
    res.end();
  }
  tecsd = {}
  fabsd = {}
  //areasd = {}
  fabs.forEach(function(fab){
    fabsd[fab.RequestedObject.Id] = fab.RequestedObject.Name;
  });
  tecs.forEach(function(tec){
    tecsd[tec.RequestedObject.Id] = tec.RequestedObject.Name;
  });
  /*areas.forEach(function(area){
    areasd[area.RequestedObject.Id] = area.RequestedObject.Name;
  });*/

  res.render('create', { title: 'Nuevo Registro - Base de Conocimiento', sessionToken: req.query.st, fabsd: fabsd, tecsd: tecsd, /*areasd: areasd*/});
});

router.post('/', function(req, res, next) {
    attsJSON = JSON.parse(req.body.att);
    date = new Date();
    req.body.att = [];
    req.body.attSint = [];
    req.body.attCaus = [];
    req.body.attSolu = [];
    firstvariable = 'data:image/png;base64,';
    secondvariable = '="';

    //Busqueda de imagenes incrustadas en el Sintoma
    if (req.body.sint.includes('base64,')){
      array = req.body.sint.split(firstvariable);
      array.forEach(function(line){
        if(array.indexOf(line)!=0){
          //console.log(array.indexOf(line));
          //console.log(line.split(secondvariable)[0]+'\n\n\n\n');
          d = date.getTime();
          attBody = api.getAttachmentBody(d+'.png', line.split(secondvariable)[0]+'==');
          console.log(attBody);
          options = {
              "url": api.url+'/api/core/content/attachment',
              "method": "POST",
              "headers": api.headersWAuth(req.body.st),
              "rejectUnauthorized": false,
              "body": JSON.stringify(attBody)
          }
          console.log(options);
          request(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              console.log(info);
              if (info.IsSuccessful){
                if (req.body.attSint){
                  req.body.attSint.push(info.RequestedObject.Id);
                } else {
                  req.body.attSint = [info.RequestedObject.Id];
                }
                req.body.sint.replace(firstvariable+line.split(secondvariable)+secondvariable, 'ATT-'+info.RequestedObject.Id)
              } else {
                console.log(info);
              }
            }
          });
        }
      });
    }

    //Busqueda de imagenes incrustadas en la Causa
    if (req.body.caus.includes('base64,')){
      array = req.body.caus.split(firstvariable);
      array.forEach(function(line){
        if(array.indexOf(line)!=0){
          //console.log(array.indexOf(line));
          //console.log(line.split(secondvariable)[0]+'\n\n\n\n');
          d = date.getTime();
          attBody = api.getAttachmentBody(d+'.png', line.split(secondvariable)[0]+'==');
          console.log(attBody);
          options = {
              "url": api.url+'/api/core/content/attachment',
              "method": "POST",
              "headers": api.headersWAuth(req.body.st),
              "rejectUnauthorized": false,
              "body": JSON.stringify(attBody)
          }
          console.log(options);
          request(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              console.log(info);
              if (info.IsSuccessful){
                if (req.body.attCaus){
                  req.body.attCaus.push(info.RequestedObject.Id);
                } else {
                  req.body.attCaus = [info.RequestedObject.Id];
                }
                req.body.sint.replace(firstvariable+line.split(secondvariable)+secondvariable, 'ATT-'+info.RequestedObject.Id)
              } else {
                console.log(info);
              }
            }
          });
        }
      });
    }

    //Busqueda de imagenes incrustadas en la Solucion
    if (req.body.solu.includes('base64,')){
      array = req.body.solu.split(firstvariable);
      array.forEach(function(line){
        if(array.indexOf(line)!=0){
          //console.log(array.indexOf(line));
          //console.log(line.split(secondvariable)[0]+'\n\n\n\n');
          d = date.getTime();
          attBody = api.getAttachmentBody(d+'.png', line.split(secondvariable)[0]+'==');
          console.log(attBody);
          options = {
              "url": api.url+'/api/core/content/attachment',
              "method": "POST",
              "headers": api.headersWAuth(req.body.st),
              "rejectUnauthorized": false,
              "body": JSON.stringify(attBody)
          }
          console.log(options);
          request(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              if (info.IsSuccessful){
                if (req.body.attSolu){
                  req.body.attSolu.push(info.RequestedObject.Id);
                } else {
                  req.body.attSolu = [info.RequestedObject.Id];
                }
                req.body.sint.replace(firstvariable+line.split(secondvariable)+secondvariable, 'ATT-'+info.RequestedObject.Id)
              } else {
                console.log(info);
              }
            }
          });
        }

      });
    }

    body = api.getContentBody(req.body, '');
    //console.log(req.body);

    options = {
        "url": api.url+'/api/core/content',
        "headers": api.headersWAuth(req.body.st),
        "method": 'POST',
        "rejectUnauthorized": false,
        "body": JSON.stringify(body)
    }

    console.log(options);

    //console.log(options);

    var reque = request(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        if (info.IsSuccessful){
          if (attsJSON.filesNames.length > 0){
            var cont = 0;
            //console.log(attsJSON);
            for (i = 0; i < attsJSON.filesNames.length; i++){
              //console.log(response);
              contentId = info.RequestedObject.Id;
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
          
          else{
            console.log(JSON.parse(body).RequestedObject.Id);
            console.log(req.body.st);
            var sessionToken = req.body.st;
            var msg = 'Se ha creado el registro con exito';
            var id = JSON.parse(body).RequestedObject.Id;
            res.render('create',{sessionToken: sessionToken, msg: msg, id: id});
          }
        } else {
          console.log(error);
          console.log(info);
          res.render('search',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al crear el registro.'});
        }
      }else{
        console.log(error);
      }
    });
});

module.exports = router;
