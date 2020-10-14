package english

import (
	"fmt"
	"xpyun-opensdk/model"
	"xpyun-opensdk/service"
	"xpyun-opensdk/util"
)

const USER_NAME = "362657746@qq.com"
const USER_KEY = "d572cab55de44e52b2e6214f7a012cb7"
const OK_PRINTER_SN = "35L8WLAHB12BD48"

//add printers in batch
func AddPrintersTest() {
	request := model.AddPrinterRequest{}

	requestItem1 := model.AddPrinterRequestItem{}
	//*Required*: The printer number must be a real printer number,
	// otherwise it will cause the subsequent api to fail to print
	requestItem1.Sn = OK_PRINTER_SN
	requestItem1.Name = "X58B"

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	//*Required*: Array elements are json objects.
	//{"cardno": "traffic card number", "idcode": "printer identifying code","name":"printer name", "sn":"serial number of printer"}
	//The fields of sn and name are required, and a maximum 50 sets can be added each time.
	request.Items = make([]*model.AddPrinterRequestItem, 0)
	request.Items = append(request.Items, &requestItem1)

	result := service.XpYunAddPrinters(&request)

	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)
	//resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example
	fmt.Println(result.Content.Data)
}

/**
 * set voice type for printer
 * voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
 */
func SetVoiceTypeTest() {
	request := model.SetVoiceTypeRequest{}

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	//The serial number of the printer
	request.Sn = OK_PRINTER_SN
	request.VoiceType = 4

	result := service.XpYunSetVoiceType(request)

	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)
	fmt.Println(result.Content.Data)
}

//delete printer in batch
func DelPrintersTest() {
	request := model.DelPrinterRequest{}

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	// *Required*: A set of printer serial number, which is string array.
	snList := []string{OK_PRINTER_SN}
	request.SnList = snList

	result := service.XpYunDelPrinters(&request)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)
	// resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example
	fmt.Println(result.Content.Data)
}

// modify information of your printer
func UpdPrinterTest() {
	request := model.UpdPrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	//*Required*: The serial number of the printer
	request.Sn = OK_PRINTER_SN

	//*Required*：Name of the printer
	request.Name = "X58C111"

	result := service.XpYunUpdatePrinter(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//clear printer queue
func XpYunDelPrinterQueueTest() {
	request := model.PrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	//*Required*: The serial number of the printer
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	result := service.XpYunDelPrinterQueue(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//check if the order is printed successfully
func XpYunQueryOrderStateTest() {
	request := model.QueryOrderStateRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()
	request.GenerateSign()

	// *Required*: The order ID is returned by the “print order” interface.
	request.OrderId = "OM20100318260450986272"

	result := service.XpYunQueryOrderState(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data: True indicates return after printed and false indicates return not printed.
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//query order statistics for printer on a certain day
func XpYunQueryOrderStatisTest() {
	request := model.QueryOrderStatisRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	//*Required*: The serial number of the printer
	request.Sn = OK_PRINTER_SN

	//*Required*: Query date, format in yyyy-MM-dd, e.g. 2019-08-15
	request.Date = "2020-10-03"

	result := service.XpYunQueryOrderStatis(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data: Json object, return the order quantity printed and to be printed, e.g. {"printed": 2,"waiting": 0}
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//query status of printer
func XpYunQueryPrinterStatusTest() {
	request := model.PrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY

	//*Required*: The serial number of the printer
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	result := service.XpYunQueryPrinterStatus(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	// resp.data:Return to the printer status value, three types in total:
	// 0 indicates offline status.
	// 1 indicates online and normal status.
	// 2 indicates online and abnormal status.
	// Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//cloud speaker play voice
func XpYunPlayVoiceTest() {
	request := model.VoiceRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	//payment method:
	//Value range 41~55:
	//Alipay 41, WeChat 42, Cloud Payment 43, UnionPay Swipe 44, UnionPay Payment 45, Member Card Consumption 46, Member Card Recharge 47, Yipay 48, Successful Collection 49, Jialian Payment 50, One Wallet 51, JD Pay 52, Quick money payment 53, Granville payment 54, Xiangqian payment 55
	//It is only used for Xinye cloud printers that support the amount broadcast.
	request.PayType = 41

	// Pay or not:
	// Value range 59~61
	// Refund 59 to account 60 consumption 61.
	// It is only used for Xinye cloud printers that support the amount broadcast.
	request.PayMode = 59

	//Payment amount:
	//Up to 2 decimal places are allowed.
	//It is only used for Xinye cloud printers that support the amount broadcast.
	request.Money = 24.15

	result := service.XpYunPlayVoice(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	// resp.data:Returns 0 correctly
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}
