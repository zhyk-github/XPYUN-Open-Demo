<?php

class RestRequest {
	/**
     * 开发者ID(芯烨云后台登录账号）
     */
    var $user;
   	/**
     * 芯烨云后台开发者密钥
     */
    var $userKey; 
    /**
     * 当前UNIX时间戳，10位，精确到秒
     */
    var $timestamp;
    /**
     * 对参数 user + UKEY + timestamp 拼接后（+号表示连接符）进行SHA1加密得到签名，值为40位小写字符串
     */
    var $sign;
    /**
     * debug=1返回非json格式的数据。仅测试时候使用
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
     * 打印机编号
     */
    var $sn;
    /**
     * 打印机名称
     */
    var $name;
}


class AddPrinterRequest extends RestRequest {
	var $items;
}

class DelPrinterRequest extends RestRequest {

    /**
     * 打印机编号集合
     */
    var $snlist;

}


class PrintRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;

    /**
     * 打印内容,不能超过5000字节
     */
    var $content;

    /**
     * 打印份数，默认为1
     */
    var $copies = 1;

    /**
     * 打印模式，默认为0
     */
    var $mode = 0;

    /**
     * 支付方式41~55：支付宝 微信 ...
     */
    var $payType;
    /**
     * 支付与否59~61：退款 到账 消费
     */
    var $payMode;
    /**
     * 支付金额
     */
    var $money;

}

class SetVoiceTypeRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;

    /**
     * 声音类型： 0真人语音（大） 1真人语音（中） 2真人语音（小） 3 嘀嘀声  4 静音
     */
    var $voiceType;
}

class UpdPrinterRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;
    /**
     * 打印机名称
     */
    var $name;
}

class PrinterRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;
}

class QueryOrderStateRequest extends RestRequest {

    /**
     * 订单编号
     */
    var $orderId;
}

class QueryOrderStatisRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;
    /**
     * 查询日期，格式YY-MM-DD，如：2016-09-20
     */
    var $date;

}

class VoiceRequest extends RestRequest {

    /**
     * 打印机编号
     */
    var $sn;

    /**
     * 支付方式41~55：支付宝 微信 ...
     */
    var $payType;
    /**
     * 支付与否59~61：退款 到账 消费
     */
    var $payMode;
    /**
     * 支付金额
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