import xpyunopensdk.model.model as model
import xpyunopensdk.service.httpclient as httpclient

BASE_URL = 'https://open.xpyun.net/api/openapi'


def xpYunPostJson(url, jsonData):
    return httpclient.http_post_json(url, jsonData)


# add printers in batch
# param restRequest
# return
def xpYunAddPrinters(restRequest=model.AddPrinterRequest):
    url = BASE_URL + "/xprinter/addPrinters"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp,
    }
    items = []
    for item in restRequest.items:
        items.append({"sn": item.sn, "name": item.name})

    jsonData["items"] = items

    return xpYunPostJson(url, jsonData)

# set voice type for printer
# voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
# @param restRequest
# @return
def xpYunSetVoiceType(restRequest):
    url = BASE_URL + "/xprinter/setVoiceType"
    json = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp,
        "voiceType": restRequest.voiceType,
    }
    return xpYunPostJson(url, json)


# print receipt
# @param restRequest 
# @return

def xpYunPrint(restRequest):
    url = BASE_URL + "/xprinter/print"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp,
        "content": restRequest.content,
    }
    return xpYunPostJson(url, jsonData)


# print label
# @param restRequest
# @return

def xpYunPrintLabel(restRequest):
    url = BASE_URL + "/xprinter/printLabel"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp,
        "content": restRequest.content,
    }
    return xpYunPostJson(url, jsonData)


# delete printer in batch
# @param restRequest
# @return

def xpYunDelPrinters(restRequest):
    url = BASE_URL + "/xprinter/delPrinters"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "snlist": restRequest.snlist,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp
    }
    return xpYunPostJson(url, jsonData)


# modify information of your printer
# @param restRequest
# @return

def xpYunUpdatePrinter(restRequest):
    url = BASE_URL + "/xprinter/updPrinter"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "name": restRequest.name,
        "cardno": restRequest.cardno,
        "idcode": restRequest.idcode,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp
    }
    return xpYunPostJson(url, jsonData)


# delete printing task queue of a printer
# @param restRequest
# @return

def xpYunDelPrinterQueue(restRequest):
    url = BASE_URL + "/xprinter/delPrinterQueue"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp
    }
    return xpYunPostJson(url, jsonData)


# check if the order is printed successfully
# @param restRequest
# @return

def xpYunQueryOrderState(restRequest):
    url = BASE_URL + "/xprinter/queryOrderState"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "orderId": restRequest.orderId,
        "timestamp": restRequest.timestamp
    }
    return xpYunPostJson(url, jsonData)


# query order statistics for printer on a certain day
# @param restRequest
# @return

def xpYunQueryOrderStatis(restRequest):
    url = BASE_URL + "/xprinter/queryOrderStatis"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "date": restRequest.date,
        "timestamp": restRequest.timestamp
    }
    return xpYunPostJson(url, jsonData)


# query status of printer 
# 0 indicates offline status; 1 indicates online and normal status; 2 indicates online and abnormal status
# Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
# @param restRequest
# @return

def xpYunQueryPrinterStatus(restRequest):
    url = BASE_URL + "/xprinter/queryPrinterStatus"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp
    }

    return xpYunPostJson(url, jsonData)


# cloud speaker play voice
# @param restRequest - 播放语音信息
# @return

def xpYunPlayVoice(restRequest):
    url = BASE_URL + "/xprinter/playVoice"
    jsonData = {
        "user": restRequest.user,
        "userKey": restRequest.userKey,
        "sn": restRequest.sn,
        "payType": restRequest.payType,
        "payMode": restRequest.payMode,
        "money": restRequest.money,
        "sign": restRequest.sign,
        "debug": restRequest.debug,
        "timestamp": restRequest.timestamp
    }

    return xpYunPostJson(url, jsonData)
