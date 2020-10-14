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

//3.打印标签订单（只用于标签打印机）
function printLabelTest() {
$printContent= <<<EOF
<PAGE>
<SIZE>40,30</SIZE>
<TEXT x="9" y="10" w="1" h="2" r="0">#001       一号桌￥￥20.3   1/3</TEXT>
<TEXT x="60" y="80" w="2" h="2" r="0">西红柿炒蛋</TEXT>
<TEXT x="9" y="180" w="1" h="1" r="0">张女士       13600001111</TEXT>
</PAGE>

<PAGE>
<TEXT x="9" y="10" w="1" h="2" r="0">#002       二号桌      2/3</TEXT>
<TEXT x="60" y="80" w="2" h="2" r="0">清蒸排骨</TEXT>
<TEXT x="9" y="180" w="1" h="1" r="0">王先生       13600002222</TEXT>
</PAGE>

<PAGE>
<TEXT x="9" y="10" w="1" h="2" r="0">#003       三号桌      3/3</TEXT>
<TEXT x="60" y="80" w="2" h="2" r="0">酸甜排骨</TEXT>
<TEXT x="9" y="180" w="1" h="1" r="0">赵先生       13600003333</TEXT>
</PAGE>
EOF;
    
    $request = new PrintRequest();
    $request->generateSign();
    $request->sn=OK_PRINTER_SN;
    $request->content=$printContent;
    $request->copies=1;

    $result = xpYunPrintLabel($request);
    print $result->content->code;
    print $result->content->msg;
}


//3.打印小票订单
function printTest() {

$printContent= <<<EOF
<HB><C>> **#3 百度 **</C>></HB>
................................
<B><C>----货到付款----</C></B>
<BOLD><C>测试营销2</C></BOLD>
下单时间：2017年08月07日23时10分
订单编号：15021186372518
*************商品***************\r<C>---1号口袋---</C><HB>
同步菜 x1 10.00
Dan x1 7.80
</HB>
................................
配送费：5.00
餐盒费：4.00
********************************<HB>
订单总价：￥26.80
棕榈南岸 4栋3单元404号
牟（先生）：186-9830-9092
订单备注：[用餐人数]1人；
</HB><B><C> ** 完 **</C></B>
<BARCODE>98As765?'@#89</BARCODE>
EOF;

    $printContent = "<LOGO><LC>GyoAPwAAAAAAAAAAAAAAAAABAQMHDgwZGBgwMBAAIDYGBAyMjASEBgMDAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKGyoAPwAAAAAAAAAAAAEAAAyc2PBgxYcCAkKDAQAAAABAcHB4cHIDB/7///9/f38fH8//Xx8fDw8PRyEAAAAAAAAAAAAKGyoAPwAIDA8PREjAgAAAAQEHj8cAAAEBAULCwAAAAQcAAAEHAzj8/z+f/////////////////////P4AAAAHD///fx8KGyoAPwAAAADMREZicmLy//35+f3//z8/Pjw4YIAAhAgINPjzxv///vbkwc/98///+vz48ODQ/OAAAQ8DH38///////8KGyoAPwAAAAAAAAAAAAAA8PDg4ODAwMAIAAAgQICgIECAAIAMOGDAAAAQwIBggPgAAABg8HBAQEDAwMDD/vz+/PDAwIAKGyoAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK</LOGO>".$printContent;
    
    $request = new PrintRequest();
    $request->generateSign();
    $request->sn=OK_PRINTER_SN;
    $request->content=$printContent;
    $request->copies=1;

    $request->payType=41;
    $request->payMode=60;
    $request->money=20.15;

    $result = xpYunPrint($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}

//4.批量删除打印机
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

//5.修改打印机信息
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

//6.清空待打印队列
function delPrinterQueueTest() {
    $request = new PrinterRequest();
    $request->generateSign();
    $request->sn=OK_PRINTER_SN;

    $result = xpYunDelPrinterQueue($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}

//7.查询订单是否打印成功
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

//8.查询打印机某天的订单统计数
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

//9.查询打印机状态
function queryPrinterStatusTest() {
    $request = new PrinterRequest();
    $request->generateSign();
    $request->sn = OK_PRINTER_SN;

    $result = xpYunQueryPrinterStatus($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";
    print $result->content->data."\n";
}   

//10.云喇叭播放语音
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