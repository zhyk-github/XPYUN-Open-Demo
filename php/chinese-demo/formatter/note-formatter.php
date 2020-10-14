<?php
include_once 'util/encoding.php';

define('ROW_MAX_CHAR_LEN', 32);
define('MAX_NAME_CHAR_LEN', 20);
define('LAST_ROW_MAX_NAME_CHAR_LEN', 16);
define('MAX_QUANTITY_CHAR_LEN', 6);
define('MAX_PRICE_CHAR_LEN', 6);

$orderNameEmpty = str_repeat(" ", MAX_NAME_CHAR_LEN);

/**
 * 格式化菜品列表（用于58mm打印机）
 * 注意：默认字体排版，若是字体宽度倍大后不适用
 * 58mm打印机一行可打印32个字符 汉子按照2个字符算
 * 分3列： 名称20字符一般用16字符4空格填充  数量6字符  单价6字符，不足用英文空格填充 名称过长换行
 *
 * @param foodName 菜品名称
 * @param quantity 数量
 * @param price 价格
 * @throws Exception
 */

function formatPrintOrderItem($foodName, $quantity, $price) {
	$foodNameLen = CalcGbkLenForPrint($foodName);
	// print("foodNameLen=".$foodNameLen."\n");

	$quantityStr = ''.$quantity;
	$quantityLen = CalcAsciiLenForPrint($quantityStr);
	// print("quantityLen=".$quantityLen."\n");

	$priceStr = ''.round($price, 2);
	$priceLen = CalcAsciiLenForPrint($priceStr);
	// print("priceLen=".$priceLen);

	$result = $foodName;
	$mod = $foodNameLen % ROW_MAX_CHAR_LEN;
	// print("mod=".$mod."\n");

	if($mod <= LAST_ROW_MAX_NAME_CHAR_LEN) {
        // 保证各个列的宽度固定，不足部分，利用空格填充
        //make sure all the column length fixed, fill with space if not enough		
		$result = $result.str_repeat(" ", MAX_NAME_CHAR_LEN-$mod);

	} else {
        // 另起新行
        // new line
        $result = $result."<BR>";
        $result = $result.$orderNameEmpty;
	}

	$result = $result.$quantityStr.str_repeat(" ", MAX_QUANTITY_CHAR_LEN-$quantityLen);
	$result = $result.$priceStr.str_repeat(" ", MAX_QUANTITY_CHAR_LEN-$priceLen);

    $result = $result."<BR>";

    return $result;
}


?>