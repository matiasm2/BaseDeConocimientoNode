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
        "body": JSON.stringify(body),
        "rejectUnauthorized": false
      }

      var req = request(method, url, options);
      if(req.getBody())response=req.getBody();

      console.log(response);
      return response
    }
}
