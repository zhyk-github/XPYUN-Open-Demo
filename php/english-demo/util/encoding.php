<?php

function CalcGbkLenForPrint($data) {	
	return iconv_strlen($data, iconv_get_encoding("internal_encoding")) * 2;

    // var_dump(iconv_get_encoding("ALL"));
	// print("data=".$data."=".iconv_strlen($data, ini_get("iconv.internal_encoding"))."\n");
	// $encode = mb_detect_encoding($str, array("ASCII",'UTF-8',"GB2312","GBK",'BIG5')); 
	// if (strpos(strtolower($encode), "gb") == false) {
	// 	// $str_encode = mb_convert_encoding($data, 'GBK', $encode);
	// 	$data = iconv($str_encode, "GBK",$data);
	// 	// print("data=".$data."=".mb_strlen($str_encode, "GBK")."\n");
 //    }

 //    return mb_strlen($data, "GBK") * 2;
}

function CalcAsciiLenForPrint($data) {
    return strlen($data);
}	

?>