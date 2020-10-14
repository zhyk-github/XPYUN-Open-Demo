package service

import (
	"xpyun-opensdk/model"
)

const BASE_URL = "https://open.xpyun.net/api/openapi"

func xpyunPostJson(url string, request interface{}) *model.XPYunResp {
	result := HttpPostJson(url, request)

	return result
}

/**
 * 1.批量添加打印机
 * @param request
 * @return
 */
func XpYunAddPrinters(request *model.AddPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/addPrinters"
	return xpyunPostJson(url, request)
}

/**
 * 2.设置打印机语音类型
 * @param request
 * @return
 */
func XpYunSetVoiceType(request model.SetVoiceTypeRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/setVoiceType"
	return xpyunPostJson(url, request)
}

/**
 * 3.批量删除打印机
 * @param request
 * @return
 */
func XpYunDelPrinters(request *model.DelPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/delPrinters"

	return xpyunPostJson(url, request)
}

/**
 * 4.修改打印机信息
 * @param request
 * @return
 */
func XpYunUpdatePrinter(request *model.UpdPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/updPrinter"

	return xpyunPostJson(url, request)
}

/**
 * 5.清空待打印队列
 * @param request
 * @return
 */
func XpYunDelPrinterQueue(request *model.PrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/delPrinterQueue"

	return xpyunPostJson(url, request)
}

/**
 * 6.查询订单是否打印成功
 * @param request
 * @return
 */
func XpYunQueryOrderState(request *model.QueryOrderStateRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryOrderState"

	return xpyunPostJson(url, request)
}

/**
 * 7.查询打印机某天的订单统计数
 * @param request
 * @return
 */
func XpYunQueryOrderStatis(request *model.QueryOrderStatisRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryOrderStatis"

	return xpyunPostJson(url, request)
}

/**
* 8.查询打印机状态
* 0、离线 1、在线正常 2、在线不正常
 * 备注：异常一般是无纸，离线的判断是打印机与服务器失去联系超过30秒
* @param request
* @return
*/
func XpYunQueryPrinterStatus(request *model.PrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryPrinterStatus"

	return xpyunPostJson(url, request)
}

/**
* 9.云喇叭播放语音
* 0、离线 1、在线正常 2、在线不正常
 * 备注：异常一般是无纸，离线的判断是打印机与服务器失去联系超过30秒
* @param request
* @return
*/
func XpYunPlayVoice(request *model.VoiceRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/playVoice"

	return xpyunPostJson(url, request)
}

/**
 * 3.打印小票订单
 * @param restRequest - 打印订单信息
 * @return
 */
func XpYunPrint(request *model.PrintRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/print"

	return xpyunPostJson(url, request)
}

/**
 * 3.打印标签订单
 * @param restRequest - 打印订单信息
 * @return
 */
func XpYunPrintLabel(request *model.PrintRequest) *model.XPYunResp {

	url := BASE_URL + "/xprinter/printLabel"

	return xpyunPostJson(url, request)
}
