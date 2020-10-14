package model

import (
	"strconv"
	"xpyun-opensdk/util"
)

type RestRequest struct {
	/**
	 * 开发者ID(芯烨云后台登录账号）
	 */
	User string `json:"user"`
	/**
	 * 芯烨云后台开发者密钥
	 */
	UserKey string `json:"userKey"`
	/**
	 * 当前UNIX时间戳，10位，精确到秒
	 */
	Timestamp int64 `json:"timestamp"`
	/**
	 * 对参数 user + UKEY + timestamp 拼接后（+号表示连接符）进行SHA1加密得到签名，值为40位小写字符串
	 */
	Sign string `json:"sign"`
	/**
	 * debug=1返回非json格式的数据。仅测试时候使用
	 */
	Debug int `json:"debug"`
}

func (request *RestRequest) GenerateSign() {
	request.Sign = util.Sign(request.User + request.UserKey + strconv.FormatInt(request.Timestamp, 10))
}

type AddPrinterRequestItem struct {
	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`
	/**
	 * 打印机名称
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
	 * 打印机编号集合
	 */
	SnList []string `json:"snlist"`
}

type PrintRequest struct {
	RestRequest `json:",inline"`
	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`

	/**
	 * 打印内容,不能超过5000字节
	 */
	Content string `json:"content"`

	/**
	 * 打印份数，默认为1
	 */
	Copies int `json:"copies"`

	/**
	 * 打印模式，默认为0
	 */
	Mode int `json:"mode"`

	/**
	 * 支付方式41~55：支付宝 微信 ...
	 */
	PayType int `json:"payType"`
	/**
	 * 支付与否59~61：退款 到账 消费
	 */
	PayMode int `json:"payMode"`
	/**
	 * 支付金额
	 */
	Money float64 `json:"money"`
}

type SetVoiceTypeRequest struct {
	RestRequest `json:",inline"`
	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`

	/**
	 * 声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
	 */
	VoiceType int `json:"voiceType"`
}

type UpdPrinterRequest struct {
	RestRequest `json:",inline"`

	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`
	/**
	 * 打印机名称
	 */
	Name string `json:"name"`
}

type PrinterRequest struct {
	RestRequest `json:",inline"`

	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`
}

type QueryOrderStateRequest struct {
	RestRequest `json:",inline"`

	/**
	 * 订单编号
	 */
	OrderId string `json:"orderId"`
}

type QueryOrderStatisRequest struct {
	RestRequest `json:",inline"`

	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`
	/**
	 * 查询日期，格式YY-MM-DD，如：2016-09-20
	 */
	Date string `json:"date"`
}

type VoiceRequest struct {
	RestRequest `json:",inline"`

	/**
	 * 打印机编号
	 */
	Sn string `json:"sn"`

	/**
	 * 支付方式41~55：支付宝 微信 ...
	 */
	PayType int `json:"payType"`
	/**
	 * 支付与否59~61：退款 到账 消费
	 */
	PayMode int `json:"payMode"`
	/**
	 * 支付金额
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
