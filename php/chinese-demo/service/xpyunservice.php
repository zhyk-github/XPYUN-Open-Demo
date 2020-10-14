<?php
    include_once 'httpclient.php'; 

	define('BASE_URL', 'https://open.xpyun.net/api/openapi');

    function xpyunPostJson($url, $request) {
        $jsonRequest = json_encode($request);

        list($returnCode, $returnContent) = http_post_json($url, $jsonRequest);

        $result = new XPYunResp();
        $result->httpStatusCode = $returnCode;
        $result->content = json_decode($returnContent);  

        return $result;    
    }

    /**
     * 1.批量添加打印机
     * @param restRequest
     * @return
     */
    function xpYunAddPrinters($restRequest) {
        $url = BASE_URL."/xprinter/addPrinters";
        return xpyunPostJson($url, $restRequest);
    }	

    /**
     * 2.设置打印机语音类型
     * @param restRequest
     * @return
     */
    function xpYunSetVoiceType($restRequest) {
        $url = BASE_URL."/xprinter/setVoiceType";
        return xpyunPostJson($url, $restRequest);
    }  

    /**
     * 3.打印小票订单
     * @param restRequest - 打印订单信息
     * @return
     */
    function xpYunPrint($restRequest) {
        $url = BASE_URL."/xprinter/print";

        return xpyunPostJson($url, $restRequest);
    }	

    /**
     * 3.打印标签订单
     * @param restRequest - 打印订单信息
     * @return
     */
    function xpYunPrintLabel($restRequest) {
        $url = BASE_URL."/xprinter/printLabel";

        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * 4.批量删除打印机
     * @param restRequest
     * @return
     */
    function xpYunDelPrinters($restRequest) {
        $url = BASE_URL."/xprinter/delPrinters";

        return xpyunPostJson($url, $restRequest);
    }   


    /**
     * 5.修改打印机信息
     * @param restRequest
     * @return
     */
    function xpYunUpdatePrinter($restRequest) {
        $url = BASE_URL."/xprinter/updPrinter";
        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * 6.清空待打印队列
     * @param restRequest
     * @return
     */
    function xpYunDelPrinterQueue($restRequest) {
        $url = BASE_URL."/xprinter/delPrinterQueue";
        return xpyunPostJson($url, $restRequest);
    }    

    /**
     * 7.查询订单是否打印成功
     * @param restRequest
     * @return
     */
    function xpYunQueryOrderState($restRequest) {
        $url = BASE_URL."/xprinter/queryOrderState";

        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * 8.查询打印机某天的订单统计数
     * @param restRequest
     * @return
     */
    function xpYunQueryOrderStatis($restRequest) {
        $url = BASE_URL."/xprinter/queryOrderStatis";
        return xpyunPostJson($url, $restRequest);
    }

    /**
     * 9.查询打印机状态
     *
     * 0、离线 1、在线正常 2、在线不正常
     * 备注：异常一般是无纸，离线的判断是打印机与服务器失去联系超过30秒
     * @param restRequest
     * @return
     */
    function xpYunQueryPrinterStatus($restRequest) {
        $url = BASE_URL."/xprinter/queryPrinterStatus";

        return xpyunPostJson($url, $restRequest);
    }    

    /**
     * 10.云喇叭播放语音
     * @param restRequest - 播放语音信息
     * @return
     */
    function xpYunPlayVoice($restRequest) {
        $url = BASE_URL."/xprinter/playVoice";

        return xpyunPostJson($url, $restRequest);
    }          
?>