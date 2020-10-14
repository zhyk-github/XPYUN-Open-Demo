
var encoding = require('../util/encoding.js');
var util = require('../util/xputil.js');

const ROW_MAX_CHAR_LEN  = 32;
const MAX_NAME_CHAR_LEN = 20;
const LAST_ROW_MAX_NAME_CHAR_LEN = 16;
const MAX_QUANTITY_CHAR_LEN = 6;
const MAX_PRICE_CHAR_LEN = 6;

var orderNameEmpty = util.strRepeat("", MAX_NAME_CHAR_LEN);

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

function formatPrintOrderItem(foodName, quantity, price) {

	let foodNameLen = encoding.CalcGbkLenForPrint(foodName);

	let quantityStr = '' + quantity;
	let quantityLen = encoding.CalcAsciiLenForPrint(quantityStr);

	let priceStr = '' + Math.round(price);
	let priceLen = encoding.CalcAsciiLenForPrint(priceStr);

	let result = foodName;
	let mod = foodNameLen % ROW_MAX_CHAR_LEN;
	if(mod <= LAST_ROW_MAX_NAME_CHAR_LEN) {
        //make sure all the column length fixed, fill with space if not enough		
		result = result + util.strRepeat(" ", MAX_NAME_CHAR_LEN - mod);

	} else {
        // new line
        result = result + "<BR>";
        result = result + orderNameEmpty;
	}

	result = result + quantityStr + util.strRepeat(" ", MAX_QUANTITY_CHAR_LEN-quantityLen);
	result = result + priceStr + util.strRepeat(" ", MAX_QUANTITY_CHAR_LEN-priceLen);

    result = result + "<BR>";

    return result;
}


module.exports = {formatPrintOrderItem};