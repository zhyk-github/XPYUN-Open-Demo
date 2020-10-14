import xpyunopensdk.model.model as model
import xpyunopensdk.service.httpclient as httpclient

BASE_URL = 'https://open.xpyun.net/api/openapi'


def xpYunPostJson(url, jsonData):
    return httpclient.http_post_json(url, jsonData)


# 批量添加打印机
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

    # 2.设置打印机语音类型
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


# 3.打印小票订单
# @param restRequest - 打印订单信息
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


# 3.打印标签订单
# @param restRequest - 打印订单信息
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


# 4.批量删除打印机
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


# 5.修改打印机信息
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


# 6.清空待打印队列
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


# 7.查询订单是否打印成功
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


# 8.查询打印机某天的订单统计数
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


# 9.查询打印机状态
# 0、离线 1、在线正常 2、在线不正常
# 备注：异常一般是无纸，离线的判断是打印机与服务器失去联系超过30秒
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


# 10.云喇叭播放语音
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
