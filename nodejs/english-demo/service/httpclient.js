var rp = require('request-promise');
var model = require('../model/model.js');

/**
 * send http request with json body
 *
 * @param url 
 * @param jsonStr json string
 * 
 */
function httpPostJson(url, json){
    return new Promise(function(resolve){
        req = {
            url: url,
            method: "POST",
            json: true,
            encoding: 'utf-8',
            headers: {
                "content-type": "application/json",
            },
            body: json
        }


        rp(req).then(function(parsedBody) {
            var resp = new model.XPYunResp();
            resp.httpStatusCode = 200;

            resp.content = parsedBody
 
            resolve(resp);      
        }).catch(function(err) {
            console.log(`[Error]: ${err}`)
            resolve(null);
        }); 
    });
}


module.exports = {httpPostJson};