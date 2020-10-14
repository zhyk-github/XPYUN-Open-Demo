<?php

    /**
     * hash sign
     * @param signSource - the string to sign
     * @return
     */
    function sign($signSource) {
        $signature = sha1($signSource);

        return $signature;
    }   

   	//get millisecond
	function getMillisecond() {
	    list($s1, $s2) = explode(' ', microtime());
	    return sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
	} 

?>