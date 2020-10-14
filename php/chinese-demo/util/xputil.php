<?php

    /**
     * 哈稀签名
     * @param signSource - 源字符串
     * @return
     */
    function sign($signSource) {
        $signature = sha1($signSource);

        return $signature;
    }   

   	//获得毫秒数
	function getMillisecond() {
	    list($s1, $s2) = explode(' ', microtime());
	    return sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
	} 

?>