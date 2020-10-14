import xpyunopensdk.model.model as model
import xpyunopensdk.service.xpyunservice as service

# *Required*: Xinye Cloud background registration account (ie email address or developer ID), after successful registration of the developer user,
# log in to Xinye Cloud background and view the developer ID under [Personal Center -> Developer Information]
# <p>
# Currently [ms168cn@126.com] is just an example, need to be modified before use
USER_NAME = "362657746@qq.com"

# *Required*: The developer key automatically generated after registering an account on the Xinye Cloud background.
# After the developer user has successfully registered,log in to the Xinye Cloud background and view the developer key under [Personal Center -> Developer Information]
# <p>
# Currently [4f87eabe876f4d8a877c4f09038045ad] is just an example, need to be modified before use
USER_KEY = "d572cab55de44e52b2e6214f7a012cb7"

# *Required*: The printer number, you must add a printer or call the API interface to add a printer under [Print Management -> Printer Management] in the backstage of Xinye Cloud Management.
# Pay attention to replace the printer number when testing the ticket machine and labeling machine
# How to get the print number: There will be a QR code with PID at the bottom of the printer, and a string of characters after the PID is the printer number
# <p>
# Currently [20RZ5MQX2X39049] is just an example, need to be modified before use

# receipt printer
OK_PRINTER_SN = "35L8WLAHB12BD48"

# OK_PRINTER_SN = "30YKDYCYJTA6F4B"  # label printer

# add printers in batch
def addPrintersTest():
    request = model.AddPrinterRequest(USER_NAME, USER_KEY)

    requestItem1 = model.AddPrinterRequestItem

    # *Required*: The printer number must be a real printer number,
    # otherwise it will cause the subsequent api to fail to prin
    requestItem1.sn = OK_PRINTER_SN

    # Printer name
    requestItem1.name = "Test Printer"

    # The fields of sn and name are required, and a maximum 50 sets can be added each time.
    requestItems = [requestItem1]
    request.items = requestItems
    request.generateSign()

    result = service.xpYunAddPrinters(request)

    print(str(result.content.code))
    print(result.content.msg)

    # resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example
    print(result.content.data)


#  set voice type for printer
#  voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
def setVoiceTypeTest():
    request = model.SetVoiceTypeRequest(USER_NAME, USER_KEY)

    # *Required*: The serial number of the printer
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *Required*: Voice type: 0 human voice (loud) 1 human voice (medium) 2 human voice (low) 3 Ticking  4 Mute sound
    request.voiceType = 1

    result = service.xpYunSetVoiceType(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    print(result.content.data)


# delete printer in batch
def delPrintersTest():
    request = model.DelPrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.generateSign()

    # *Required*: A set of printer serial number, which is string array.
    snlist = []

    # The serial number of the printer
    snlist.append(OK_PRINTER_SN)
    request.snlist = snlist

    result = service.xpYunDelPrinters(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example
    print(result.content.data)


# modify information of your printer
def updPrinterTest():
    request = model.UpdPrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *Required*: The serial number of the printer
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *Required*：Name of the printer
    request.name = "X58C111"

    # Traffic card number of the printer
    request.cardno = "13022223333"
    request.idcode = "123"

    result = service.xpYunUpdatePrinter(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    print(result.content.data)


# clear printer queue
def xpYunDelPrinterQueueTest():
    request = model.PrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *Required*: The serial number of the printer
    request.sn = OK_PRINTER_SN
    request.generateSign()

    result = service.xpYunDelPrinterQueue(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    print(result.content.data)


# check if the order is printed successfully
def xpYunQueryOrderStateTest():
    request = model.QueryOrderStateRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.sn = OK_PRINTER_SN
    request.generateSign()

    #  *Required*: The order ID is returned by the “print order” interface.
    request.orderId = "OM20100207490465237954"

    result = service.xpYunQueryOrderState(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: True indicates return after printed and false indicates return not printed.
    print(result.content.data)


# query order statistics for printer on a certain day
def queryOrderStatisTest():
    request = model.QueryOrderStatisRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *Required*: The serial number of the printer
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # *Required*: Query date, format in yyyy-MM-dd, e.g. 2019-08-15
    request.date = "2020-10-02"

    result = service.xpYunQueryOrderStatis(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data: Json object, return the order quantity printed and to be printed, e.g. {"printed": 2,"waiting": 0}
    print(result.content.data)


# query status of printer
def xpYunQueryPrinterStatusTest():
    request = model.PrinterRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY

    # *Required*: The serial number of the printer
    request.sn = OK_PRINTER_SN
    request.generateSign()

    result = service.xpYunQueryPrinterStatus(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:Return to the printer status value, three types in total:
    # 0 indicates offline status.
    # 1 indicates online and normal status.
    # 2 indicates online and abnormal status.
    # Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
    print(result.content.data)


# cloud speaker play voice
def xpYunPlayVoiceTest():
    request = model.VoiceRequest(USER_NAME, USER_KEY)
    request.user = USER_NAME
    request.userKey = USER_KEY
    request.sn = OK_PRINTER_SN
    request.generateSign()

    # payment method:
    # Value range 41~55:
    # Alipay 41, WeChat 42, Cloud Payment 43, UnionPay Swipe 44, UnionPay Payment 45, Member Card Consumption 46, Member Card Recharge 47, Yipay 48, Successful Collection 49, Jialian Payment 50, One Wallet 51, JD Pay 52, Quick money payment 53, Granville payment 54, Xiangqian payment 55
    # It is only used for Xinye cloud printers that support the amount broadcast.
    request.payType = 41

    # Pay or not:
    # Value range 59~61:
    # Refund 59 to account 60 consumption 61.
    # It is only used for Xinye cloud printers that support the amount broadcast.
    request.payMode = 59

    # Payment amount:
    # Up to 2 decimal places are allowed.
    # It is only used for Xinye cloud printers that support the amount broadcast.
    request.money = 24.15

    result = service.xpYunPlayVoice(request)
    print(result.httpStatusCode)
    print(result.content.code)
    print(result.content.msg)

    # resp.data:Returns 0 correctly
    print(result.content.data)
