var rp = require('request-promise');
var model = require('../model/model.js');

/**
 * 发送http的json请求
 *
 * @param url 请求url
 * @param jsonStr 发送的json字符串
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

            // let content = new model.XPYunRespContent();
            // content.code = parsedBody["code"];
            // content.msg = parsedBody["msg"];
            // content.data = parsedBody["data"];
            // content.serverExecutedTime = parsedBody["serverExecutedTime"];

            resp.content = parsedBody
 
            resolve(resp);      
        }).catch(function(err) {
            console.log(`[Error]: ${err}`)
            resolve(null);
        }); 
    });
}


module.exports = {httpPostJson};