<?php
include_once 'util/encoding.php';

define('ROW_MAX_CHAR_LEN', 32);
define('MAX_NAME_CHAR_LEN', 20);
define('LAST_ROW_MAX_NAME_CHAR_LEN', 16);
define('MAX_QUANTITY_CHAR_LEN', 6);
define('MAX_PRICE_CHAR_LEN', 6);

$orderNameEmpty = str_repeat(" ", MAX_NAME_CHAR_LEN);

/**
 * Format the dish list (for 58 mm printer)
 * Note: this is  default font typesetting, not applicable if the font width is doubled
 * The 58mm printer can print 32 characters per line
 * Divided into 3 columns: name(20 characters), quanity(6 characters),price(6 characters)
 * The name column is generally filled with 16  your characters and 4 spaces
 * Long name column will cause auto line break
 *
 * @param foodName 
 * @param quantity 
 * @param price 
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
        //make sure all the column length fixed, fill with space if not enough		
		$result = $result.str_repeat(" ", MAX_NAME_CHAR_LEN-$mod);

	} else {
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