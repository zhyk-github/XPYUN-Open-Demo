<?php

include_once 'model/model.php';
include_once 'util/xputil.php';
include_once 'service/xpyunservice.php';

/**
 * *Required*: Xinye Cloud background registration account (ie email address or developer ID), after successful registration of the developer user,
 * log in to Xinye Cloud background and view the developer ID under [Personal Center -> Developer Information]
 * <p>
 * Currently [ms168cn@126.com] is just an example, need to be modified before use
 */
define('USER_NAME', '362657746@qq.com');

/**
 * *Required*: The developer key automatically generated after registering an account on the Xinye Cloud background.
 * After the developer user has successfully registered,log in to the Xinye Cloud background and view the developer key under [Personal Center -> Developer Information]
 * <p>
 * Currently [4f87eabe876f4d8a877c4f09038045ad] is just an example, need to be modified before use
 */     
define('USER_KEY', 'd572cab55de44e52b2e6214f7a012cb7');

/**
 * *Required*: The printer number, you must add a printer or call the API interface to add a printer under [Print Management -> Printer Management] in the backstage of Xinye Cloud Management.
 * Pay attention to replace the printer number when testing the ticket machine and labeling machine
 * How to get the print number: There will be a QR code with PID at the bottom of the printer, and a string of characters after the PID is the printer number
 * <p>
 * 
 */
define('OK_PRINTER_SN', 'XXXXXXXXXXXXXXXXXXXX');

//add printers in batch
function addPrintersTest()
{
	$request = new AddPrinterRequest();

	$requestItem1 = new AddPrinterRequestItem();

    //*Required*: The printer number must be a real printer number,
    // otherwise it will cause the subsequent api to fail to print    
	$requestItem1->sn = OK_PRINTER_SN;
	$requestItem1->name="X58B";
	
    //*Required*: Array elements are json objects.
    //{"cardno": "traffic card number", "idcode": "printer identifying code","name":"printer name", "sn":"serial number of printer"}
    //The fields of sn and name are required, and a maximum 50 sets can be added each time.
	$requestItems = array($requestItem1);

	$request->generateSign();
	$request->items = $requestItems;

	$result = xpYunAddPrinters($request);

    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example
    var_dump($result->content->data);
	
}

/**
 * set voice type for printer
 * voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
 */
function setVoiceTypeTest() {
    $request = new SetVoiceTypeRequest();
    $request->generateSign();
    
    //The serial number of the printer
    $request->sn=OK_PRINTER_SN;

    //Voice type: 0 human voice (loud) 1 human voice (medium) 2 human voice (low) 3 Ticking  4 Mute sound
    $request->voiceType=4;

    //resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    $result = xpYunSetVoiceType($request);
    print $result->content->code;
    print $result->content->msg;
}

//delete printer in batch
function delPrintersTest() {
    $request = new DelPrinterRequest();
    $request->generateSign();
    
    //*Required*: A set of printer serial number, which is string array.
    $snlist = array();
    $snlist[0] = OK_PRINTER_SN;
    $request->snlist = $snlist;

    $result = xpYunDelPrinters($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

//resp.data: Return one json object, including success and failure information, see https://www.xpyun.net/open/index.html example    
    var_dump($result->content->data);
}

//modify information of your printer
function updPrinterTest() {
    $request = new UpdPrinterRequest();
    $request->generateSign();

    //*Required*: The serial number of the printer    
    $request->sn=OK_PRINTER_SN;
    $request->name = "X58C75432";

    $result = xpYunUpdatePrinter($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    print $result->content->data."\n";
}

//clear printer queue
function delPrinterQueueTest() {
    $request = new PrinterRequest();
    $request->generateSign();

    //*Required*: The serial number of the printer    
    $request->sn=OK_PRINTER_SN;

    $result = xpYunDelPrinterQueue($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data: Return to a Boolean type: true indicates a successful setting and false indicates a failed setting.
    print $result->content->data."\n";
}

//check if the order is printed successfully
function queryOrderStateTest() {
    $request = new QueryOrderStateRequest();
    $request->generateSign();

    //*Required*: The order ID is returned by the “print order” interface.
    $request->orderId = "OM20081920225422019931";
    $result = xpYunQueryOrderState($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data: True indicates return after printed and false indicates return not printed.
    print $result->content->data."\n";
} 

//query order statistics for printer on a certain day
function queryOrderStatisTest() {
    $request = new QueryOrderStatisRequest();
    $request->generateSign();

    //*Required*: The serial number of the printer
    $request->sn = OK_PRINTER_SN;

    //*Required*: Query date, format in yyyy-MM-dd, e.g. 2019-08-15
    $request->date = "2020-08-19";

    $result = xpYunQueryOrderStatis($request);
    print $result->content->code;
    print $result->content->msg;

    //resp.data: Json object, return the order quantity printed and to be printed, e.g. {"printed": 2,"waiting": 0}
    var_dump($result->content->data);
}    

//query status of printer
function queryPrinterStatusTest() {
    $request = new PrinterRequest();
    $request->generateSign();

    //*Required*: The serial number of the printer
    $request->sn = OK_PRINTER_SN;

    $result = xpYunQueryPrinterStatus($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data:Return to the printer status value, three types in total:
    //0 indicates offline status.
    //1 indicates online and normal status.
    //2 indicates online and abnormal status.
    //Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.    
    print $result->content->data."\n";
}   

//cloud speaker play voice
function playVoiceTest() {
    $request = new VoiceRequest();
    $request->generateSign();

    //*Required*: The serial number of the printer
    $request->sn = OK_PRINTER_SN;

    //payment method:
    //Value range 41~55:
    //Alipay 41, WeChat 42, Cloud Payment 43, UnionPay Swipe 44, UnionPay Payment 45, Member Card Consumption 46, Member Card Recharge 47, Yipay 48, Successful Collection 49, Jialian Payment 50, One Wallet 51, JD Pay 52, Quick money payment 53, Granville payment 54, Xiangqian payment 55
    //It is only used for Xinye cloud printers that support the amount broadcast.
    $request->payType = 41;

    //Pay or not:
    //Value range 59~61:
    //Refund 59 to account 60 consumption 61.
    //It is only used for Xinye cloud printers that support the amount broadcast.    
    $request->payMode = 60;

    //Payment amount:
    //Up to 2 decimal places are allowed.
    //It is only used for Xinye cloud printers that support the amount broadcast.    
    $request->money = 20.15;

    $result = xpYunPlayVoice($request);
    print $result->content->code."\n";
    print $result->content->msg."\n";

    //resp.data:Returns 0 correctly    
    print $result->content->data."\n";
}    


?>