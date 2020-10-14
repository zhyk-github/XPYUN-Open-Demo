httpclient = require('./httpclient.js'); 

const BASE_URL = "https://open.xpyun.net/api/openapi";

var service = function() {

}

function xpyunPostJson(url, json) {
    // let result = await httpclient.httpPostJson(url, json);

    return httpclient.httpPostJson(url, json);
}

/**
 * add printers 
 * @param restRequest
 * @return
 */
function xpYunAddPrinters(restRequest) {
    let url = BASE_URL + "/xprinter/addPrinters";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp,
        "items" : restRequest.items,
    }
    return xpyunPostJson(url, json);
}	

/**
 * set voice type for printer
 * voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
 * @param restRequest
 * @return
 */
function xpYunSetVoiceType(restRequest) {
    let url = BASE_URL + "/xprinter/setVoiceType";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp,
        "voiceType" : restRequest.voiceType,
    }

    return xpyunPostJson(url, json);
}  

/**
 * print receipt
 * @param restRequest
 * @return
 */
function xpYunPrint(restRequest) {
    let url = BASE_URL + "/xprinter/print";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp,
        "content" : restRequest.content,
    }

    return xpyunPostJson(url, json);
}	

/**
 * print label
 * @param restRequest
 * @return
 */
function xpYunPrintLabel(restRequest) {
    let url = BASE_URL+"/xprinter/printLabel";

    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp,
        "content" : restRequest.content,
    }    

    return xpyunPostJson(url, json);
}   

/**
 * delete printer in batch
 * @param restRequest
 * @return
 */
function xpYunDelPrinters(restRequest) {
    let url = BASE_URL+"/xprinter/delPrinters";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "snlist" : restRequest.snlist,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp
    }
    return xpyunPostJson(url, json);
}   


/**
 * modify information of your printer
 * @param restRequest
 * @return
 */
function xpYunUpdatePrinter(restRequest) {
    let url = BASE_URL+"/xprinter/updPrinter";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "name" : restRequest.name,
        "cardno" : restRequest.cardno,
        "idcode" : restRequest.idcode,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}   

/**
 * delete printing task queue of a printer
 * @param restRequest
 * @return
 */
function xpYunDelPrinterQueue(restRequest) {
    let url = BASE_URL+"/xprinter/delPrinterQueue";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}    

/**
 * check if the order is printed successfully
 * @param restRequest
 * @return
 */
function xpYunQueryOrderState(restRequest) {
    url = BASE_URL+"/xprinter/queryOrderState";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "orderId" : restRequest.orderId,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}   

/**
 * query order statistics for printer on a certain day
 * @param restRequest
 * @return
 */
function xpYunQueryOrderStatis(restRequest) {
    let url = BASE_URL+"/xprinter/queryOrderStatis";

    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "date" : restRequest.date,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}

/**
 * query status of printer 
 *
 * 0 indicates offline status; 1 indicates online and normal status; 2 indicates online and abnormal status
 * Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
 * @param restRequest
 * @return
 */
function xpYunQueryPrinterStatus(restRequest) {
    let url = BASE_URL+"/xprinter/queryPrinterStatus";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}    

/**
 * cloud speaker play voice
 * @param restRequest
 * @return
 */
function xpYunPlayVoice(restRequest) {
    let url = BASE_URL+"/xprinter/playVoice";
    let json = {
        "user" : restRequest.user,
        "userKey" : restRequest.userKey, 
        "sn" : restRequest.sn,
        "payType" : restRequest.payType,
        "payMode" : restRequest.payMode,
        "money" : restRequest.money,
        "sign" : restRequest.sign,
        "debug" : restRequest.debug,
        "timestamp" : restRequest.timestamp
    }

    return xpyunPostJson(url, json);
}     


module.exports = {
    xpYunAddPrinters, xpYunSetVoiceType, xpYunDelPrinters, xpYunUpdatePrinter, xpYunDelPrinterQueue, xpYunQueryOrderState,
    xpYunQueryOrderStatis, xpYunQueryPrinterStatus, xpYunPlayVoice, xpYunPrint, xpYunPrintLabel
};