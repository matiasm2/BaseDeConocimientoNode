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
            console.log(req.getBody());
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
                     /*[String( this.ids.area)]: {
                         "Type" : 4,
                         "Value" : {
                              "ValuesListIds" : [ reg.area],
                              "OtherText" : null
                            },
                          "FieldId":  this.ids.area
                      },*/
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
						  [String( this.ids.linkf)]: {
                            "Type" : 1,
                            "Value" :  reg.linkf,
                             "FieldId":  this.ids.linkf
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
						   [String( this.ids.ver)]: {
                              "Type" : 1,
                              "Value" :  reg.ver,
                               "FieldId":  this.ids.ver
                           },
						   [String( this.ids.usr)]: {
                              "Type" : 15,
                              "Value" :  reg.usr,
                               "FieldId":  this.ids.usr
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
          delete body['Content']['FieldContents'][String( this.ids.att)];
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
    },/*
    "url": "http://10.100.107.90",
    "instanceName": "DEV",
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
    }*/
    "url": "http://172.16.1.52",
    "instanceName": "PROD",
    "ids": { //Pr
      "moduleId": 2467, //Punultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/2467/false/default/2261)
      "levelId": 2261,  //Ultimo numero de url (/apps/ArcherApp/Home.aspx#search/70/75/2467/false/default/2261)
      "tit": 22517,
      "fab": 22523,
      "tec": 22520,
      "mod": 22528,
      //"area": 22524,
	  "linkf":24316,
	  "ver": 24310,
      "usr": 22529,
      "sint": 22521,
      "caus": 22525,
      "solu": 22526,
      "att": 22527,
      "fabVL": 2682,
      "tecVL": 2681,
      //"areaVL": 5886
    }

}
