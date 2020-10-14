package model

import (
	"strconv"
	"xpyun-opensdk/util"
)

type RestRequest struct {
	/**
	 * the user ID login platform.xpyun.net
	 */
	User string `json:"user"`
	/**
	 * the user key in xp yun
	 */
	UserKey string `json:"userKey"`
	/**
	 * current timestamp
	 */
	Timestamp int64 `json:"timestamp"`
	/**
	 * verify sign
	 */
	Sign string `json:"sign"`
	/**
	 * default 0; 1 just for testing
	 */
	Debug int `json:"debug"`
}

func (request *RestRequest) GenerateSign() {
	request.Sign = util.Sign(request.User + request.UserKey + strconv.FormatInt(request.Timestamp, 10))
}

type AddPrinterRequestItem struct {
	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`
	/**
	 * printer name
	 */
	Name string `json:"name"`
}

type AddPrinterRequest struct {
	RestRequest `json:",inline"`
	Items       []*AddPrinterRequestItem `json:"items"`
}

type DelPrinterRequest struct {
	RestRequest `json:",inline"`
	/**
	 * printer serial number list
	 */
	SnList []string `json:"snlist"`
}

type PrintRequest struct {
	RestRequest `json:",inline"`
	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`

	/**
	 * print content
	 */
	Content string `json:"content"`

	/**
	 * print copies
	 */
	Copies int `json:"copies"`

	/**
	 * print mode
	 */
	Mode int `json:"mode"`

	/**
	 * pay type
	 */
	PayType int `json:"payType"`
	/**
	 * pay or not
	 */
	PayMode int `json:"payMode"`
	/**
	 * pay amount
	 */
	Money float64 `json:"money"`
}

type SetVoiceTypeRequest struct {
	RestRequest `json:",inline"`
	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`

	/**
	 * voice type
	 */
	VoiceType int `json:"voiceType"`
}

type UpdPrinterRequest struct {
	RestRequest `json:",inline"`

	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`
	/**
	 * printer name
	 */
	Name string `json:"name"`
}

type PrinterRequest struct {
	RestRequest `json:",inline"`

	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`
}

type QueryOrderStateRequest struct {
	RestRequest `json:",inline"`

	/**
	 * orer id
	 */
	OrderId string `json:"orderId"`
}

type QueryOrderStatisRequest struct {
	RestRequest `json:",inline"`

	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`
	/**
	 * query date, the format should be : YY-MM-DD， e.g. 2016-09-20
	 */
	Date string `json:"date"`
}

type VoiceRequest struct {
	RestRequest `json:",inline"`

	/**
	 * printer serial number
	 */
	Sn string `json:"sn"`

	/**
	 * pay type
	 */
	PayType int `json:"payType"`
	/**
	 * pay mode
	 */
	PayMode int `json:"payMode"`
	/**
	 * pay amount
	 */
	Money float64 `json:"money"`
}

type XPYunResp struct {
	HttpStatusCode int `json:"httpStatusCode"`

	Content *XPYunRespContent `json:"content"`
}

type XPYunRespContent struct {
	Code               int         `json:"code"`
	Msg                string      `json:"msg"`
	Data               interface{} `json:"data"`
	ServerExecutedTime int         `json:"serverExecutedTime"`
}
