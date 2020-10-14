var model = require('../model/model.js');

var service = require('../service/xpyunservice.js');

const USER_NAME = '362657746@qq.com';
const USER_KEY = 'd572cab55de44e52b2e6214f7a012cb7';
const OK_PRINTER_SN = '35L8WLAHB12BD48';

//1.批量添加打印机
async function addPrintersTest()
{
	let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;
	request.generateSign();

    //其中打印机编号 sn 和名称 name 字段为必填项，每次最多添加50台
	requestItem1 = new model.AddPrinterRequestItem();

	// 打印机编号，必须是真实的打印机编号，否在会导致后续api无法打印
	requestItem1.sn = OK_PRINTER_SN;

	//打印机名称
	requestItem1.name="测试打印机";
	
    //*必填*：items:数组元素：
    //{"name":"打印机名称","sn":"打印机编号"}
    //其中打印机编号 sn 和名称 name 字段为必填项，每次最多添加50台	
	requestItems = new Array();
	requestItems.push(requestItem1);
	
	request.items = requestItems;

	let result = await service.xpYunAddPrinters(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);

	//resp.data:返回1个 json 对象，包含成功和失败的信息，详看https://www.xpyun.net/open/index.html示例
	console.log(result.content.data);
	
}

//2.设置打印机语音类型
async function setVoiceTypeTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*必填*：打印机编号
	request.sn = OK_PRINTER_SN;
	request.generateSign();

    //*必填*：声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
    request.voiceType=1;

	let result = await service.xpYunSetVoiceType(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:返回布尔类型：true 表示设置成功 false 表示设置失败
	console.log(result.content.data);
}


//3.批量删除打印机
async function delPrintersTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;
	request.generateSign();

    //*必填*：打印机编号集合，类型为字符串数组
	let snlist = new Array();
    snlist.push(OK_PRINTER_SN);
    request.snlist = snlist;

	let result = await service.xpYunDelPrinters(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	 //resp.data:返回1个 json 对象，包含成功和失败的信息，详看https://www.xpyun.net/open/index.html示例
	console.log(result.content.data);
}


//4.修改打印机信息
async function updPrinterTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*必填*：打印机编号
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	//*必填*：打印机名称
	request.name = "X58C111";

	//打印机流量卡号码
	request.cardno = "13022223333";
	request.idcode = "123";

	let result = await service.xpYunUpdatePrinter(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:返回布尔类型：true 表示成功 false 表示失败
	console.log(result.content.data);
}

//5.清空待打印队列
async function xpYunDelPrinterQueueTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*必填*：打印机编号
	request.sn = OK_PRINTER_SN;
	request.generateSign();


	let result = await service.xpYunDelPrinterQueue(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:返回布尔类型：true 表示成功 false 表示失败
	console.log(result.content.data);
}

//6.查询订单是否打印成功
async function xpYunQueryOrderStateTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;	
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	// *必填*：订单编号，由“打印订单”接口返回
	request.orderId = "OM20100207490465237954";


	let result = await service.xpYunQueryOrderState(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:返回布尔类型,已打印返回true,未打印返回false
	console.log(result.content.data);
}

//7.查询打印机某天的订单统计数
async function queryOrderStatisTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*必填*：打印机编号
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	//*必填*：查询日期，格式yyyy-MM-dd，如：2019-08-15
	request.date = "2020-10-02";


	let result = await service.xpYunQueryOrderStatis(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:json对象，返回已打印订单数和等待打印订单数，如：{"printed": 2, "waiting": 0}
	console.log(result.content.data);
}

//8.查询打印机状态
async function xpYunQueryPrinterStatusTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*必填*：打印机编号	
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	let result = await service.xpYunQueryPrinterStatus(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

    //resp.data:返回打印机状态值，共三种：
    //0 表示离线
    //1 表示在线正常
    //2 表示在线异常
    //备注：异常一般情况是缺纸，离线的判断是打印机与服务器失去联系超过 30 秒	
	console.log(result.content.data);
}

//9.金额播报
async function xpYunPlayVoiceTest() {
    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;
	request.sn = OK_PRINTER_SN;
	request.generateSign();

    //支付方式：
    //取值范围41~55：
    //支付宝 41、微信 42、云支付 43、银联刷卡 44、银联支付 45、会员卡消费 46、会员卡充值 47、翼支付 48、成功收款 49、嘉联支付 50、壹钱包 51、京东支付 52、快钱支付 53、威支付 54、享钱支付 55
    //仅用于支持金额播报的芯烨云打印机。
	request.payType = 41;

    //支付与否：
    //取值范围59~61：
    //退款 59 到账 60 消费 61。
    //仅用于支持金额播报的芯烨云打印机	
	request.payMode = 59;

    //支付金额：
    //最多允许保留2位小数。
    //仅用于支持金额播报的芯烨云打印机。	
	request.money = 24.15;

	let result = await service.xpYunPlayVoice(request);
	console.log(result.httpStatusCode);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data:正确返回0
	console.log(result.content.data);
}

module.exports = {
	addPrintersTest, setVoiceTypeTest, delPrintersTest,
	updPrinterTest, xpYunDelPrinterQueueTest, xpYunQueryOrderStateTest,queryOrderStatisTest,
	xpYunQueryPrinterStatusTest, xpYunPlayVoiceTest
};