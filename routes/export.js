var express = require('express');
var api = require('../apiCalls');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  content = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'//api/core/content/'+req.query.id, '');
  if (!content.IsSuccessful){
    res.render('error', { title: content.ValidationMessages[0].Description+' - Base de Conocimiento', sessionToken: req.query.st});
  }
  fabs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.fabVL, '');
  tecs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.tecVL, '');
  if(fabs.StatusCode === 401 || tecs.StatusCode === 401){
    res.redirect('/logout?st='+req.query.st);
    res.end();
  }
  //usraux = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/user/'+content.RequestedObject.FieldContents[22529].Value.UserList[0].Id, '');
  tecsd = {}
  fabsd = {}
  reg = {
    "tit": content.RequestedObject.FieldContents[api.ids.tit].Value,
	"ver": content.RequestedObject.FieldContents[api.ids.ver].Value,
	//"usr": usraux.RequestedObject.DisplayName,
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
  res.render('export', { title: 'Registro - Base de Conocimiento', sessionToken: req.query.st, id: req.query.id, fabsd: fabsd, tecsd: tecsd, areasd: '0', reg: reg});
  res.end();
});

module.exports = router;
