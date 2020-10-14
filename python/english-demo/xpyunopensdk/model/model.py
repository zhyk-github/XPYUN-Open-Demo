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
    # printer serial number
    sn = ""
    # printer name
    name = ""

    def getSn(self):
        return self.sn

    def getName(self):
        return self.name


class AddPrinterRequest(RestRequest):
    # printer info list
    items = []


class DelPrinterRequest(RestRequest):
    # printer serial number list
    snlist = []


class PrintRequest(RestRequest):
    # printer serial number
    sn = ""

    # printer content
    content = ""

    # printer copies
    copies = 1

    # print mode
    mode = 0

    # pay type
    payType = 0

    # pay or not
    payMode = 0

    # pay amount
    money = 0.0


class SetVoiceTypeRequest(RestRequest):
    # printer serial number
    sn = ""

    # 
    voiceType = 0


class UpdPrinterRequest(RestRequest):
    # printer serial number
    sn = ""

    # printer name
    name = ""


class PrinterRequest(RestRequest):
    # printer serial number
    sn = ""


class QueryOrderStateRequest(RestRequest):
    # order id
    orderId = ""


class QueryOrderStatisRequest(RestRequest):
    # printer serial number
    sn = ""

    # query date
    date = ""


class VoiceRequest(RestRequest):
    # printer serial number
    sn = ""

    # pay type
    payType = 0

    # pay mode
    payMode = 0

    # pay amount
    money = 0.0


class XPYunResp:
    httpStatusCode = 0
    content = ""


class XPYunRespContent:
    code = 0
    msg = ""
    data = ""
    serverExecutedTime = 0
