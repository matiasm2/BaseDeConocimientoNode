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
	 "headersSOAP": function(soapAction){
      return {
        "Content-Type" : "text/xml;charset=utf-8",
		"SOAPAction" : soapAction
      }
    },

    "restAPICall" : function(headers, method, url, body){
        var response;
        options = {
            "headers": headers,
            "rejectUnauthorized": false
        }
        if(!headers.SOAPAction){
            if (method==='POST' || method==='PUT'){
                options.body = JSON.stringify(body);
            } else {
                options['headers']['X-Http-Method-Override'] = 'GET';
            }
        }else{
            options.body = body;
        }

        var req = request(method, url, options);
        if(req.statusCode <= 300){
            if(req.getBody())response=req.getBody();
        } else {
            response = '{"StatusCode": '+req.statusCode+',"IsSuccessful":false}';
        }
        if(!headers.SOAPAction){
            return JSON.parse(response)
        } else {
            return response
        }
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
                            "Value" : reg.att,
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
    "getAttBody": function(id, atts){
      body = {
           "Content":{
               "LevelId" :  this.ids.levelId,
               "FieldContents" : {
                        [String( this.ids.att)]: {
                            "Type" : 11,
                            "Value" : atts,
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
    "getAttachmentBody": function(attachmentName, attachmentBytes){
      return {"AttachmentName":attachmentName, "AttachmentBytes":attachmentBytes}
    },
    "getMymeType": function(ext){
    		ext = ext.toLowerCase();
    		mimeType = '';
    		switch(ext){
    			case 'docx':
    				mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    				break;
    			case 'doc':
    			case 'dot':
    					mimeType = 'application/msword';
    					break;
    			case 'xls':
    			case 'xlm':
    			case 'xla':
    			case 'xlc':
    			case 'xlt':
    			case 'xlw':
    				mimeType = 'application/vnd.ms-exce';
    				break;
    			case 'xlsx':
    					mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    					break;
    			case 'pdf':
    				mimeType = 'application/pdf';
    				break;
    			case 'csv':
    					mimeType = 'text/csv';
    					break;
    			case 'txt':
    			case 'text':
    			case 'conf':
    			case 'def':
    				mimeType = 'text/plain';
    				break;
    			case 'png':
    					mimeType = 'image/png';
    					break;
    			case 'jpeg':
    			case 'jpg':
    			case 'jpe':
    				mimeType = 'image/jpeg';
    				break;
    			case 'gif':
    				mimeType = 'image/gif';
    				break;
    			case '':
    					mimeType = '';
    					break;
    		}

    		return mimeType;
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
