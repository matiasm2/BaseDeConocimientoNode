var request = require('sync-request');

module.exports ={
    "headers": {
      "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Content-Type": "application/json"
    },
    "headersWAuth": function(sessionToken){
      return {
        "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Content-Type": "application/json",
        "Authorization":"Archer session-id="+sessionToken
      }
    },
    "restAPICall" : function(headers, method, url, body){
      var response;
      options = {
        "headers": headers,
        "rejectUnauthorized": false
      }
      if (method==='POST' || method==='PUT'){
        options.body = JSON.stringify(body);
      } else {
        options['headers']['X-Http-Method-Override'] = 'GET';
      }

      var req = request(method, url, options);
      if(req.statusCode <= 300){
          if(req.getBody())response=req.getBody();
      } else {
        response = '{"StatusCode": '+req.statusCode+',"IsSuccessful":false}';
      }
      return JSON.parse(response)
    },
    "getContentBody": function(reg, id = ''){
      body = {
           "Content":{
               "LevelId" :  this.ids.levelId,
               "FieldContents" : {
                    [String( this.ids.tit)]: {
                        "Type" : 1,
                        "Value" :  reg.titulo,
                         "FieldId":  this.ids.tit
                     },
                     [String( this.ids.area)]: {
                         "Type" : 4,
                         "Value" : {
                              "ValuesListIds" : [ reg.area],
                              "OtherText" : null
                            },
                          "FieldId":  this.ids.area
                      },
                      [String( this.ids.fab)]: {
                          "Type" : 4,
                          "Value" : {
                                "ValuesListIds" : [ reg.fab],
                                "OtherText" : null
                              },
                           "FieldId":  this.ids.fab
                       },
                      [String( this.ids.tec)]: {
                          "Type" : 4,
                          "Value" : {
                                "ValuesListIds" :  [ reg.tec],
                                "OtherText" : null
                              },
                           "FieldId":  this.ids.tec
                       },
                       [String( this.ids.mod)]: {
                           "Type" : 1,
                           "Value" :  reg.mod,
                            "FieldId":  this.ids.mod
                        },
                        [String( this.ids.sint)]: {
                            "Type" : 1,
                            "Value" :  reg.sint,
                             "FieldId":  this.ids.sint
                         },
                         [String( this.ids.caus)]: {
                             "Type" : 1,
                             "Value" :  reg.caus,
                              "FieldId":  this.ids.caus
                          },
                          [String( this.ids.solu)]: {
                              "Type" : 1,
                              "Value" :  reg.solu,
                               "FieldId":  this.ids.solu
                           },
                        [String( this.ids.att)]: {
                            "Type" : 11,
                            "Value" : [],
                             "FieldId":  this.ids.att
                         }
                    }
                }
        }
        if (id){
          body['Content']['Id'] = id;
        }
        return body
    },
    "url": "http://10.100.107.90",
    "ids": {
      "moduleId": 542, //Punultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/542/false/default/368)
      "levelId": 368,  //Ultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/542/false/default/368)
      "tit": 30523,
      "fab": 30532,
      "tec": 30529,
      "mod": 30537,
      "area": 30533,
      "sint": 30530,
      "caus": 30534,
      "solu": 30535,
      "att": 30536,
      "fabVL": 5682,
      "tecVL": 5681,
      "areaVL": 5683
    }
    /*
    "ids": { //Pr
      "moduleId": 542, //Punultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/542/false/default/368)
      "levelId": 368,  //Ultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/542/false/default/368)
      "tit": 30523,
      "fab": 30532,
      "tec": 30529,
      "mod": 30537,
      "area": 30533,
      "sint": 30530,
      "caus": 30534,
      "solu": 30535,
      "att": 30536,
      "fabVL": 5682,
      "tecVL": 5681,
      "areaVL": 5683
    }
    */
}
