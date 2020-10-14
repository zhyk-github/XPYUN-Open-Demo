<?php

class RestRequest {
	/**
     * the user ID login platform.xpyun.net
     */
    var $user;
   	/**
     * the user key in xp yun
     */
    var $userKey; 
    /**
     * current timestamp
     */
    var $timestamp;
    /**
     * verify sign 
     */
    var $sign;
    /**
     * default 0; 1 just for testing
     */
    var $debug;

	function __construct() {
		$this->user = USER_NAME;
		$this->userKey = USER_KEY;
		$this->debug = 0;
		$this->timestamp = getMillisecond();		
	}    

	function generateSign() {
		$this->sign= sign($this->user.$this->userKey.$this->timestamp);
	}
}

class AddPrinterRequestItem {

    /**
     * printer serial number
     */
    var $sn;
    /**
     * printer name
     */
    var $name;
}


class AddPrinterRequest extends RestRequest {
	var $items;
}

class DelPrinterRequest extends RestRequest {

    /**
     * printer serial number list
     */
    var $snlist;

}


class PrintRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;

    /**
     * print content
     */
    var $content;

    /**
     * print copies
     */
    var $copies = 1;

    /**
     * print mode
     */
    var $mode = 0;

    /**
     * pay type
     */
    var $payType;
    /**
     * pay or not
     */
    var $payMode;
    /**
     * pay amount
     */
    var $money;

}

class SetVoiceTypeRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;

    /**
     * voice type
     */
    var $voiceType;
}

class UpdPrinterRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;
    /**
     * printer name
     */
    var $name;
}

class PrinterRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;
}

class QueryOrderStateRequest extends RestRequest {

    /**
     * orer id
     */
    var $orderId;
}

class QueryOrderStatisRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;
    /**
     * query date, the format should be : YY-MM-DD， e.g. 2016-09-20
     */
    var $date;

}

class VoiceRequest extends RestRequest {

    /**
     * printer serial number
     */
    var $sn;

    /**
     * pay type
     */
    var $payType;
    /**
     * pay or not
     */
    var $payMode;
    /**
     * pay amount
     */
    var $money;

}

class XPYunResp {
    var $httpStatusCode;

    var $content;
}

class XPYunRespContent {
    var $code;
    var $msg;
    var $data;
    var $serverExecutedTime;
}

?>