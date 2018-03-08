var express = require('express');
var router = express.Router();
var api = require('../apiCalls');

/* GET users listing. */
router.get('/', function(req, res, next) {
  content = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'//api/core/content/'+req.query.id, '');
  console.log(content);
  if (!content.IsSuccessful){
    res.render('error', { title: content.ValidationMessages[0].Description+' - Base de Conocimiento', sessionToken: req.query.st});

  }
  fabs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.fabVL, '');
  tecs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.tecVL, '');
  areas = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.areaVL, '');
  tecsd = {}
  fabsd = {}
  areasd = {}
  reg = {
    "tit": content.RequestedObject.FieldContents[api.ids.tit].Value,
    "mod": content.RequestedObject.FieldContents[api.ids.mod].Value,
    "sint": content.RequestedObject.FieldContents[api.ids.sint].Value,
    "caus": content.RequestedObject.FieldContents[api.ids.caus].Value,
    "solu": content.RequestedObject.FieldContents[api.ids.solu].Value
  }
  fabs.forEach(function(fab){
    fabsd[fab.RequestedObject.Id] = fab.RequestedObject.Name;
    if (fab.RequestedObject.Id === content.RequestedObject.FieldContents[api.ids.fab].Value.ValuesListIds[0]){
      reg['fab'] = fab.RequestedObject.Name;
      reg['fabid'] = fab.RequestedObject.Id;
    }
  });
  tecs.forEach(function(tec){
    tecsd[tec.RequestedObject.Id] = tec.RequestedObject.Name;
    if (tec.RequestedObject.Id === content.RequestedObject.FieldContents[api.ids.tec].Value.ValuesListIds[0]){
      reg['tec'] = tec.RequestedObject.Name;
      reg['tecid'] = tec.RequestedObject.Id;
    }
  });
  areas.forEach(function(area){
    areasd[area.RequestedObject.Id] = area.RequestedObject.Name;
    if (area.RequestedObject.Id === content.RequestedObject.FieldContents[api.ids.area].Value.ValuesListIds[0]){
      reg['area'] = area.RequestedObject.Name;
      reg['areaid'] = area.RequestedObject.Id;
    }
  });
  res.render('register', { title: 'Registro - Base de Conocimiento', sessionToken: req.query.st, id: req.query.id, fabsd: fabsd, tecsd: tecsd, areasd: areasd, reg: reg });
});

module.exports = router;
