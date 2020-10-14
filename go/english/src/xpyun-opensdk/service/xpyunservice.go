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
 * add printers in batch
 * @param request
 * @return
 */
func XpYunAddPrinters(request *model.AddPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/addPrinters"
	return xpyunPostJson(url, request)
}

/**
 * set voice type for printer
 * @param request
 * @return
 */
func XpYunSetVoiceType(request model.SetVoiceTypeRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/setVoiceType"
	return xpyunPostJson(url, request)
}

/**
 * delete printer in batch
 * @param request
 * @return
 */
func XpYunDelPrinters(request *model.DelPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/delPrinters"

	return xpyunPostJson(url, request)
}

/**
 * modify information of your printer
 * @param request
 * @return
 */
func XpYunUpdatePrinter(request *model.UpdPrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/updPrinter"

	return xpyunPostJson(url, request)
}

/**
 * delete printing task queue of a printer
 * @param request
 * @return
 */
func XpYunDelPrinterQueue(request *model.PrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/delPrinterQueue"

	return xpyunPostJson(url, request)
}

/**
 * check if the order is printed successfully
 * @param request
 * @return
 */
func XpYunQueryOrderState(request *model.QueryOrderStateRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryOrderState"

	return xpyunPostJson(url, request)
}

/**
 * query order statistics for printer on a certain day
 * @param request
 * @return
 */
func XpYunQueryOrderStatis(request *model.QueryOrderStatisRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryOrderStatis"

	return xpyunPostJson(url, request)
}

/**
* query status of printer
* 0 indicates offline status; 1 indicates online and normal status; 2 indicates online and abnormal status
 * Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
* @param request
* @return
*/
func XpYunQueryPrinterStatus(request *model.PrinterRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/queryPrinterStatus"

	return xpyunPostJson(url, request)
}

/**
* cloud speaker play voice
* @param request
* @return
*/
func XpYunPlayVoice(request *model.VoiceRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/playVoice"

	return xpyunPostJson(url, request)
}

/**
 * print receipt
 * @param restRequest
 * @return
 */
func XpYunPrint(request *model.PrintRequest) *model.XPYunResp {
	url := BASE_URL + "/xprinter/print"

	return xpyunPostJson(url, request)
}

/**
 * print label
 * @param restRequest
 * @return
 */
func XpYunPrintLabel(request *model.PrintRequest) *model.XPYunResp {

	url := BASE_URL + "/xprinter/printLabel"

	return xpyunPostJson(url, request)
}
