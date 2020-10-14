package chinese

import (
	"fmt"
	"xpyun-opensdk/model"
	"xpyun-opensdk/service"
	"xpyun-opensdk/util"
)

const USER_NAME = "362657746@qq.com"
const USER_KEY = "d572cab55de44e52b2e6214f7a012cb7"
const OK_PRINTER_SN = "35L8WLAHB12BD48"

//1.批量添加打印机
func AddPrintersTest() {
	request := model.AddPrinterRequest{}

	requestItem1 := model.AddPrinterRequestItem{}
	requestItem1.Sn = OK_PRINTER_SN
	requestItem1.Name = "测试打印机"

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	request.Items = make([]*model.AddPrinterRequestItem, 0)
	request.Items = append(request.Items, &requestItem1)

	result := service.XpYunAddPrinters(&request)

	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)
	fmt.Println(result.Content.Data)
}

/**
 * 2.设置打印机语音类型
 * @param restRequest
 * @return
 */
func SetVoiceTypeTest() {
	request := model.SetVoiceTypeRequest{}

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	request.Sn = OK_PRINTER_SN

	// 声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
	request.VoiceType = 4

	result := service.XpYunSetVoiceType(request)

	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	// resp.data:返回布尔类型：true 表示设置成功 false 表示设置失败
	fmt.Println(result.Content.Data)
}

//3.批量删除打印机
func DelPrintersTest() {
	request := model.DelPrinterRequest{}

	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	snList := []string{OK_PRINTER_SN}
	request.SnList = snList

	result := service.XpYunDelPrinters(&request)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)
	fmt.Println(result.Content.Data)
}

//4.修改打印机信息
func UpdPrinterTest() {
	request := model.UpdPrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()
	//*必填*：打印机编号
	request.Sn = OK_PRINTER_SN

	//*必填*：打印机名称
	request.Name = "X58C111"

	result := service.XpYunUpdatePrinter(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:返回布尔类型：true 表示成功 false 表示失败
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//5.清空待打印队列
func XpYunDelPrinterQueueTest() {
	request := model.PrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	//*必填*：打印机编号
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	result := service.XpYunDelPrinterQueue(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:返回布尔类型：true 表示成功 false 表示失败
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//6.查询订单是否打印成功
func XpYunQueryOrderStateTest() {
	request := model.QueryOrderStateRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()
	request.GenerateSign()

	// *必填*：订单编号，由“打印订单”接口返回
	request.OrderId = "OM20100318260450986272"

	result := service.XpYunQueryOrderState(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:返回布尔类型,已打印返回true,未打印返回false
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//7.查询打印机某天的订单统计数
func XpYunQueryOrderStatisTest() {
	request := model.QueryOrderStatisRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Timestamp = util.GetMillisecond()

	request.GenerateSign()

	//*必填*：打印机编号
	request.Sn = OK_PRINTER_SN

	//*必填*：查询日期，格式yyyy-MM-dd，如：2019-08-15
	request.Date = "2020-10-03"

	result := service.XpYunQueryOrderStatis(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:json对象，返回已打印订单数和等待打印订单数，如：{"printed": 2, "waiting": 0}
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//8.查询打印机状态
func XpYunQueryPrinterStatusTest() {
	request := model.PrinterRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY

	//*必填*：打印机编号
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	result := service.XpYunQueryPrinterStatus(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:返回打印机状态值，共三种：
	//0 表示离线
	//1 表示在线正常
	//2 表示在线异常
	//备注：异常一般情况是缺纸，离线的判断是打印机与服务器失去联系超过 30 秒
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}

//9.金额播报
func XpYunPlayVoiceTest() {
	request := model.VoiceRequest{}
	request.User = USER_NAME
	request.UserKey = USER_KEY
	request.Sn = OK_PRINTER_SN
	request.GenerateSign()

	//支付方式：
	//取值范围41~55：
	//支付宝 41、微信 42、云支付 43、银联刷卡 44、银联支付 45、会员卡消费 46、会员卡充值 47、翼支付 48、成功收款 49、嘉联支付 50、壹钱包 51、京东支付 52、快钱支付 53、威支付 54、享钱支付 55
	//仅用于支持金额播报的芯烨云打印机。
	request.PayType = 41

	//支付与否：
	//取值范围59~61：
	//退款 59 到账 60 消费 61。
	//仅用于支持金额播报的芯烨云打印机
	request.PayMode = 59

	//支付金额：
	//最多允许保留2位小数。
	//仅用于支持金额播报的芯烨云打印机。
	request.Money = 24.15

	result := service.XpYunPlayVoice(&request)
	fmt.Println(result.HttpStatusCode)
	fmt.Println(result.Content.Code)
	fmt.Println(result.Content.Msg)

	//resp.data:正确返回0
	fmt.Println(fmt.Sprintf("%+v", result.Content.Data))
}
