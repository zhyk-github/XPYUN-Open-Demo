package formatter

import (
	"fmt"
	"strconv"
	"xpyun-opensdk/util"
)

const ROW_MAX_CHAR_LEN = 32
const MAX_NAME_CHAR_LEN = 20
const LAST_ROW_MAX_NAME_CHAR_LEN = 16
const MAX_QUANTITY_CHAR_LEN = 6
const MAX_PRICE_CHAR_LEN = 6

var orderNameEmpty = util.StrRepeat("", MAX_NAME_CHAR_LEN)

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

func FormatPrintOrderItem(foodName string, quantity int, price float64) string {

	foodNameLen := util.CalcGbkLenForPrint(foodName)

	quantityStr := strconv.Itoa(quantity)
	quantityLen := util.CalcAsciiLenForPrint(quantityStr)

	priceStr := fmt.Sprintf("%.2f", price)
	priceLen := util.CalcAsciiLenForPrint(priceStr)

	result := foodName
	mod := foodNameLen % ROW_MAX_CHAR_LEN
	if mod <= LAST_ROW_MAX_NAME_CHAR_LEN {
		// 保证各个列的宽度固定，不足部分，利用空格填充
		result = result + util.StrRepeat(" ", MAX_NAME_CHAR_LEN-mod)

	} else {
		// 另起新行
		result = result + "<BR>"
		result = result + orderNameEmpty
	}

	result = result + quantityStr + util.StrRepeat(" ", MAX_QUANTITY_CHAR_LEN-quantityLen)
	result = result + priceStr + util.StrRepeat(" ", MAX_QUANTITY_CHAR_LEN-priceLen)

	result = result + "<BR>"

	return result
}
