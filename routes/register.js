var express = require('express');
var router = express.Router();
var api = require('../apiCalls');

/* GET users listing. */
router.get('/', function(req, res, next) {
  content = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'//api/core/content/'+req.query.id, '');
  if (!content.IsSuccessful){
    res.render('error', { title: content.ValidationMessages[0].Description+' - Base de Conocimiento', sessionToken: req.query.st});
  }
  fabs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.fabVL, '');
  tecs = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.tecVL, '');
  //areas = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/valueslistvalue/flat/valueslist/'+api.ids.areaVL, '');
  var attswitch = '';
  if(content.RequestedObject.FieldContents[api.ids.att].Value){
  attachment = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/content/attachment/'+content.RequestedObject.FieldContents[api.ids.att].Value, '');
  attswitch = attachment.RequestedObject.AttachmentName
    if(attachment.StatusCode === 401){
    res.redirect('/logout?st='+req.query.st);
    res.end();
  };
  };
  usraux = api.restAPICall(api.headersWAuth(req.query.st), 'GET', api.url+'/api/core/system/user/'+content.RequestedObject.FieldContents[22529].Value.UserList[0].Id, '');
  
  //console.log(usr);
  if(fabs.StatusCode === 401 || tecs.StatusCode === 401 || usraux.StatusCode === 401){
    res.redirect('/logout?st='+req.query.st);
    res.end();
  }



  tecsd = {}
  fabsd = {}
  areasd = {}
  reg = {
    "tit": content.RequestedObject.FieldContents[api.ids.tit].Value,
	"ver": content.RequestedObject.FieldContents[api.ids.ver].Value,
	//"usr": content.RequestedObject.FieldContents[api.ids.usr].Value,
	"usr": usraux.RequestedObject.DisplayName,
	"linkf": content.RequestedObject.FieldContents[api.ids.linkf].Value,
    "mod": content.RequestedObject.FieldContents[api.ids.mod].Value,
    "sint": content.RequestedObject.FieldContents[api.ids.sint].Value,
    "caus": content.RequestedObject.FieldContents[api.ids.caus].Value,
    "solu": content.RequestedObject.FieldContents[api.ids.solu].Value,
	"atta": attswitch
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
  /*areas.forEach(function(area){
    areasd[area.RequestedObject.Id] = area.RequestedObject.Name;
    if (area.RequestedObject.Id === content.RequestedObject.FieldContents[api.ids.area].Value.ValuesListIds[0]){
      reg['area'] = area.RequestedObject.Name;
      reg['areaid'] = area.RequestedObject.Id;
    }
  });*/
  
	if(reg.linkf && !reg.linkf.startsWith('https://') && !reg.linkf.startsWith('http://') && reg.linkf.includes('.')){
		reg.linkf = 'http://'+reg.linkf;
	} 
 


  var atts = content.RequestedObject.FieldContents[api.ids.att].Value;
  console.log(content.RequestedObject.FieldContents[api.ids.att]);
  attsarr = [];
  if (atts){
    atts.forEach(function(i){
        var a = {"href": 'attachment?st='+req.query.st+'&id='+i};
        attsarr.push(a);

    });
    res.render('register', { title: 'Registro - Base de Conocimiento', sessionToken: req.query.st, id: req.query.id, fabsd: fabsd, tecsd: tecsd, areasd: areasd, reg: reg, attsarr: attsarr});
    res.end();
  }
  res.render('register', { title: 'Registro - Base de Conocimiento', sessionToken: req.query.st, id: req.query.id, fabsd: fabsd, tecsd: tecsd, areasd: areasd, reg: reg});
  res.end();
});

module.exports = router;
