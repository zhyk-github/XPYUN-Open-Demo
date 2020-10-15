<?php

include_once 'model/model.php';
include_once 'util/xputil.php';
include_once 'service/xpyunservice.php';

define('USER_NAME', '362657746@qq.com');
define('USER_KEY', 'd572cab55de44e52b2e6214f7a012cb7');
define('OK_PRINTER_SN', '35L8WLAHB12BD48');

//1.批量添加打印机
function addPrintersTest()
{
	$request = new AddPrinterRequest();

	$requestItem1 = new AddPrinterRequestItem();
	$requestItem1->sn = OK_PRINTER_SN;
	$requestItem1->name="测试打印机";
	
	$requestItems = array($requestItem1);

	$request->generateSign();
	$request->items = $requestItems;

	$result = xpYunAddPrinters($request);

    print $result->content->code."\n";
    print $result->content->msg."\n";
    var_dump($result->content->data);
	
}

//2.设置打印机语音类型
function setVoiceTypeTest() {
    $request = new SetVoiceTypeRequest();
    $request->generateSign();
    
    $request->sn=OK_PRINTER_SN;

    // 声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
    $request->voiceType=4;

    $result = xpYunSetVoiceType($request);
    print $result->content->code;
    print $result->content->msg;
}

//3.批量删除打印机
function delPrintersTest() {
    $request = new DelPrinterRequest();
    $request->generateSign();
    
    $snlist = array();
    $snlist[0] = OK_PRINTER_SN;
    $request->snlist = $snlist;

    $result = xpYunDelPrinters($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    var_dump($result->content->data);
}

//4.修改打印机信息
function updPrinterTest() {
    $request = new UpdPrinterRequest();
    $request->generateSign();
    $request->sn=OK_PRINTER_SN;
    $request->name = "X58C75432";

    $result = xpYunUpdatePrinter($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}

//5.清空待打印队列
function delPrinterQueueTest() {
    $request = new PrinterRequest();
    $request->generateSign();
    $request->sn=OK_PRINTER_SN;

    $result = xpYunDelPrinterQueue($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}

//6.查询订单是否打印成功
function queryOrderStateTest() {
    $request = new QueryOrderStateRequest();
    $request->generateSign();
    // 打印订单号
    $request->orderId = "OM20081920225422019931";
    $result = xpYunQueryOrderState($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
} 

//7.查询打印机某天的订单统计数
function queryOrderStatisTest() {
    $request = new QueryOrderStatisRequest();
    $request->generateSign();

    $request->sn = OK_PRINTER_SN;
    $request->date = "2020-08-19";
    $result = xpYunQueryOrderStatis($request);
    print $result->content->code;
    print $result->content->msg;
    var_dump($result->content->data);
}    

//8.查询打印机状态
function queryPrinterStatusTest() {
    $request = new PrinterRequest();
    $request->generateSign();
    $request->sn = OK_PRINTER_SN;

    $result = xpYunQueryPrinterStatus($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}   

//9.云喇叭播放语音
function playVoiceTest() {
    $request = new VoiceRequest();
    $request->generateSign();
    $request->sn = OK_PRINTER_SN;

    $request->payType = 41;
    $request->payMode = 59;
    $request->money = 24.15;

    $result = xpYunPlayVoice($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}    


?>