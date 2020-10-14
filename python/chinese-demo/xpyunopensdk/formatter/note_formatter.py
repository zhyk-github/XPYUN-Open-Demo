import xpyunopensdk.util.encoding as encoding

ROW_MAX_CHAR_LEN = 32
MAX_NAME_CHAR_LEN = 20
LAST_ROW_MAX_NAME_CHAR_LEN = 16
MAX_QUANTITY_CHAR_LEN = 6
MAX_PRICE_CHAR_LEN = 6

OrderNameEmpty = " " * MAX_NAME_CHAR_LEN

"""
  格式化菜品列表（用于58mm打印机）
  注意：默认字体排版，若是字体宽度倍大后不适用
  58mm打印机一行可打印32个字符 汉子按照2个字符算
  分3列： 名称20字符一般用16字符4空格填充  数量6字符  单价6字符，不足用英文空格填充 名称过长换行
  Format the dish list (for 58 mm printer)
  Note: this is  default font typesetting, not applicable if the font width is doubled
  The 58mm printer can print 32 characters per line
  Divided into 3 columns: name(20 characters), quanity(6 characters),price(6 characters)
  The name column is generally filled with 16  your characters and 4 spaces
  Long name column will cause auto line break
 
  @param foodName 菜品名称
  @param quantity 数量
  @param price 价格
  @throws Exception
"""


def formatPrintOrderItem(foodName, quantity, price):
    foodNameLen = encoding.CalcGbkLenForPrint(foodName)

    quantityStr = str(quantity)
    quantityLen = encoding.CalcAsciiLenForPrint(quantityStr)

    priceStr = str(round(price, 2))
    priceLen = encoding.CalcAsciiLenForPrint(priceStr)

    result = foodName
    mod = foodNameLen % ROW_MAX_CHAR_LEN

    if mod <= LAST_ROW_MAX_NAME_CHAR_LEN:
        # 保证各个列的宽度固定，不足部分，利用空格填充
        # make sure all the column length fixed, fill with space if not enough
        result = result + " " * (MAX_NAME_CHAR_LEN - mod)

    else:
        # 另起新行
        # new line
        result = result + "<BR>"
        result = result + OrderNameEmpty

    result = result + quantityStr + " " * (MAX_QUANTITY_CHAR_LEN - quantityLen)
    result = result + priceStr + " " * (MAX_QUANTITY_CHAR_LEN - priceLen)

    result = result + "<BR>"

    return result
