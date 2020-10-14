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
     * add printers in batch
     * @param restRequest
     * @return
     */
    function xpYunAddPrinters($restRequest) {
        $url = BASE_URL."/xprinter/addPrinters";
        return xpyunPostJson($url, $restRequest);
    }	

    /**
     * set voice type for printer
     * voice type: 0:live big, 1:live middle, 2:live small, 3:beep, 4:muted
     * @param restRequest
     * @return
     */
    function xpYunSetVoiceType($restRequest) {
        $url = BASE_URL."/xprinter/setVoiceType";
        return xpyunPostJson($url, $restRequest);
    }  

    /**
     * print receipt
     * @param restRequest 
     * @return
     */
    function xpYunPrint($restRequest) {
        $url = BASE_URL."/xprinter/print";

        return xpyunPostJson($url, $restRequest);
    }	

    /**
     * print label
     * @param restRequest 
     * @return
     */
    function xpYunPrintLabel($restRequest) {
        $url = BASE_URL."/xprinter/printLabel";

        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * delete printer in batch
     * @param restRequest
     * @return
     */
    function xpYunDelPrinters($restRequest) {
        $url = BASE_URL."/xprinter/delPrinters";

        return xpyunPostJson($url, $restRequest);
    }   


    /**
     * modify information of your printer
     * @param restRequest
     * @return
     */
    function xpYunUpdatePrinter($restRequest) {
        $url = BASE_URL."/xprinter/updPrinter";
        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * delete printing task queue of a printer
     * @param restRequest
     * @return
     */
    function xpYunDelPrinterQueue($restRequest) {
        $url = BASE_URL."/xprinter/delPrinterQueue";
        return xpyunPostJson($url, $restRequest);
    }    

    /**
     * check if the order is printed successfully
     * @param restRequest
     * @return
     */
    function xpYunQueryOrderState($restRequest) {
        $url = BASE_URL."/xprinter/queryOrderState";

        return xpyunPostJson($url, $restRequest);
    }   

    /**
     * query order statistics for printer on a certain day
     * @param restRequest
     * @return
     */
    function xpYunQueryOrderStatis($restRequest) {
        $url = BASE_URL."/xprinter/queryOrderStatis";
        return xpyunPostJson($url, $restRequest);
    }

    /**
     * query status of printer 
     *
     * 0 indicates offline status; 1 indicates online and normal status; 2 indicates online and abnormal status
     * Remarks: Abnormal status means lack of paper, if the printer has been out of contact with the server for more than 30s, it can be confirmed to be offline status.
     * @param restRequest
     * @return
     */
    function xpYunQueryPrinterStatus($restRequest) {
        $url = BASE_URL."/xprinter/queryPrinterStatus";

        return xpyunPostJson($url, $restRequest);
    }    

    /**
     * cloud speaker play voice
     * @param restRequest 
     * @return
     */
    function xpYunPlayVoice($restRequest) {
        $url = BASE_URL."/xprinter/playVoice";

        return xpyunPostJson($url, $restRequest);
    }          
?>