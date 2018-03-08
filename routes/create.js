var express = require('express');
var api = require('../apiCalls');
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
  body = {
       "Content":{
           "LevelId" : api.ids.levelId,
           "FieldContents" : {
                [String(api.ids.tit)]: {
                    "Type" : 1,
                    "Value" : req.body.titulo,
                     "FieldId": api.ids.tit
                 },
                 [String(api.ids.area)]: {
                     "Type" : 4,
                     "Value" : {
                          "ValuesListIds" : [req.body.area],
                          "OtherText" : null
                        },
                      "FieldId": api.ids.area
                  },
                  [String(api.ids.fab)]: {
                      "Type" : 4,
                      "Value" : {
                            "ValuesListIds" : [req.body.fab],
                            "OtherText" : null
                          },
                       "FieldId": api.ids.fab
                   },
                  [String(api.ids.tec)]: {
                      "Type" : 4,
                      "Value" : {
                            "ValuesListIds" :  [req.body.tec],
                            "OtherText" : null
                          },
                       "FieldId": api.ids.tec
                   },
                   [String(api.ids.mod)]: {
                       "Type" : 1,
                       "Value" : req.body.mod,
                        "FieldId": api.ids.mod
                    },
                    [String(api.ids.sint)]: {
                        "Type" : 1,
                        "Value" : req.body.sint,
                         "FieldId": api.ids.sint
                     },
                     [String(api.ids.caus)]: {
                         "Type" : 1,
                         "Value" : req.body.caus,
                          "FieldId": api.ids.caus
                      },
                      [String(api.ids.solu)]: {
                          "Type" : 1,
                          "Value" : req.body.solu,
                           "FieldId": api.ids.solu
                       },
                    [String(api.ids.att)]: {
                        "Type" : 11,
                        "Value" : [],
                         "FieldId": api.ids.att
                     }
                }
            }
    }
    response = api.restAPICall(api.headersWAuth(req.body.st), 'POST', api.url+'/api/core/content', body);
    console.log(response);
    if (response.IsSuccessful){
      res.render('create',{sessionToken: req.body.st, msg: 'Se ha creado el registro con exito', id: response.RequestedObject.Id});
    } else if (response.StatusCode === 401){
      res.redirect(401, '/logout?st='+req.body.st);
    } else{
      res.render('create',{sessionToken: req.body.st, msg: 'Ha ocurrido un error al crear el registro.',id: ''});
    }
});

module.exports = router;
