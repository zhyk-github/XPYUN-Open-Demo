import xpyunopensdk.model.model as model
import xpyunopensdk.util.xputil as util
import xpyunopensdk.service.xpyunservice as service

USER_NAME = "362657746@qq.com"
USER_KEY = "d572cab55de44e52b2e6214f7a012cb7"
OK_PRINTER_SN = "XXXXXXXXXXXXXXXXXXXX"


# 批量添加打印机
def addPrintersTest():
    request = model.AddPrinterRequest(USER_NAME, USER_KEY)

    requestItem1 = model.AddPrinterRequestItem
    requestItem1.sn = OK_PRINTER_SN
    requestItem1.name = "测试打印机"

    requestItems = [requestItem1]
    request.items = requestItems
    request.generateSign()

    result = service.xpYunAddPrinters(request)

    print(str(result.content.code))
    print(result.content.msg)
    print(result.content.data)


# 2.设置打印机语音类型
def setVoiceTypeTest():
    request = model.SetVoiceTypeRequest(USER_NAME, USER_KEY)

    # *必填*：打印机编号
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *必填*：声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
    request.voiceType = 1

    result = service.xpYunSetVoiceType(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回布尔类型：true 表示设置成功 false 表示设置失败
    print(result.content.data)


# 3.批量删除打印机
def delPrintersTest():
    request = model.DelPrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.generateSign()

    # *必填*：打印机编号集合，类型为字符串数组
    snlist = []
    snlist.append(OK_PRINTER_SN)
    request.snlist = snlist

    result = service.xpYunDelPrinters(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回1个 json 对象，包含成功和失败的信息，详看https:# www.xpyun.net/open/index.html示例
    print(result.content.data)


# 4.修改打印机信息
def updPrinterTest():
    request = model.UpdPrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *必填*：打印机编号
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *必填*：打印机名称
    request.name = "X58C111"

    # 打印机流量卡号码
    request.cardno = "13022223333"
    request.idcode = "123"

    result = service.xpYunUpdatePrinter(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回布尔类型：true 表示成功 false 表示失败
    print(result.content.data)


# 5.清空待打印队列
def xpYunDelPrinterQueueTest():
    request = model.PrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *必填*：打印机编号
    request.sn = OK_PRINTER_SN
    request.generateSign()

    result = service.xpYunDelPrinterQueue(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回布尔类型：true 表示成功 false 表示失败
    print(result.content.data)


# 6.查询订单是否打印成功
def xpYunQueryOrderStateTest():
    request = model.QueryOrderStateRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.sn = OK_PRINTER_SN
    request.generateSign()

    #  *必填*：订单编号，由“打印订单”接口返回
    request.orderId = "OM20100207490465237954"

    result = service.xpYunQueryOrderState(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回布尔类型,已打印返回true,未打印返回false
    print(result.content.data)


# 7.查询打印机某天的订单统计数
def queryOrderStatisTest():
    request = model.QueryOrderStatisRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *必填*：打印机编号
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *必填*：查询日期，格式yyyy-MM-dd，如：2019-08-15
    request.date = "2020-10-02"

    result = service.xpYunQueryOrderStatis(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:json对象，返回已打印订单数和等待打印订单数，如：:"printed": 2, "waiting": 0
    print(result.content.data)


# 8.查询打印机状态
def xpYunQueryPrinterStatusTest():
    request = model.PrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *必填*：打印机编号
    request.sn = OK_PRINTER_SN
    request.generateSign()

    result = service.xpYunQueryPrinterStatus(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:返回打印机状态值，共三种：
    # 0 表示离线
    # 1 表示在线正常
    # 2 表示在线异常
    # 备注：异常一般情况是缺纸，离线的判断是打印机与服务器失去联系超过 30 秒
    print(result.content.data)


# 9.金额播报
def xpYunPlayVoiceTest():
    request = model.VoiceRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # 支付方式：
    # 取值范围41~55：
    # 支付宝 41、微信 42、云支付 43、银联刷卡 44、银联支付 45、会员卡消费 46、会员卡充值 47、翼支付 48、成功收款 49、嘉联支付 50、壹钱包 51、京东支付 52、快钱支付 53、威支付 54、享钱支付 55
    # 仅用于支持金额播报的芯烨云打印机。
    request.payType = 41

    # 支付与否：
    # 取值范围59~61：
    # 退款 59 到账 60 消费 61。
    # 仅用于支持金额播报的芯烨云打印机
    request.payMode = 59

    # 支付金额：
    # 最多允许保留2位小数。
    # 仅用于支持金额播报的芯烨云打印机。
    request.money = 24.15

    result = service.xpYunPlayVoice(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:正确返回0
    print(result.content.data)
