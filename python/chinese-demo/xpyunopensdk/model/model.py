import xpyunopensdk.util.xputil as util


class RestRequest:
    user = ""
    userKey = ""
    timestamp = 0
    sign = ""
    debug = 0

    def __init__(self, user, userKey):
        self.user = user
        self.userKey = userKey
        self.timestamp = util.getMillisecond()

    def generateSign(self):
        self.sign = util.sign(self.user + self.userKey + str(self.timestamp))


class AddPrinterRequestItem:
    # 打印机编号
    sn = ""
    # 打印机名称
    name = ""

    def getSn(self):
        return self.sn

    def getName(self):
        return self.name


class AddPrinterRequest(RestRequest):
    # 打印机信息列表
    items = []


class DelPrinterRequest(RestRequest):
    # 打印机编号集合
    snlist = []


class PrintRequest(RestRequest):
    # 打印机编号
    sn = ""

    # 打印内容,不能超过5000字节
    content = ""

    # 打印份数，默认为1
    copies = 1

    # 打印模式，默认为0
    mode = 0

    # 支付方式41~55：支付宝 微信 ...
    payType = 0

    # 支付与否59~61：退款 到账 消费
    payMode = 0

    # 支付金额
    money = 0.0


class SetVoiceTypeRequest(RestRequest):
    # 打印机编号
    sn = ""

    # 声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
    voiceType = 0


class UpdPrinterRequest(RestRequest):
    # 打印机编号
    sn = ""

    # 打印机名称
    name = ""


class PrinterRequest(RestRequest):
    # 打印机编号
    sn = ""


class QueryOrderStateRequest(RestRequest):
    # 订单编号
    orderId = ""


class QueryOrderStatisRequest(RestRequest):
    # 打印机编号
    sn = ""

    # 查询日期，格式YY-MM-DD，如：2016-09-20
    date = ""


class VoiceRequest(RestRequest):
    # 打印机编号
    sn = ""

    # 支付方式41~55：支付宝 微信 ...
    payType = 0

    # 支付与否59~61：退款 到账 消费
    payMode = 0

    # 支付金额
    money = 0.0


class XPYunResp:
    httpStatusCode = 0
    content = ""


class XPYunRespContent:
    code = 0
    msg = ""
    data = ""
    serverExecutedTime = 0
