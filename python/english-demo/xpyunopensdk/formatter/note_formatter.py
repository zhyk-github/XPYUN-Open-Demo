import xpyunopensdk.util.encoding as encoding

ROW_MAX_CHAR_LEN = 32
MAX_NAME_CHAR_LEN = 20
LAST_ROW_MAX_NAME_CHAR_LEN = 16
MAX_QUANTITY_CHAR_LEN = 6
MAX_PRICE_CHAR_LEN = 6

OrderNameEmpty = " " * MAX_NAME_CHAR_LEN

"""
  Format the dish list (for 58 mm printer)
  Note: this is  default font typesetting, not applicable if the font width is doubled
  The 58mm printer can print 32 characters per line
  Divided into 3 columns: name(20 characters), quanity(6 characters),price(6 characters)
  The name column is generally filled with 16  your characters and 4 spaces
  Long name column will cause auto line break
 
  @param foodName 
  @param quantity 
  @param price 
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
        # make sure all the column length fixed, fill with space if not enough
        result = result + " " * (MAX_NAME_CHAR_LEN - mod)

    else:
        # new line
        result = result + "<BR>"
        result = result + OrderNameEmpty

    result = result + quantityStr + " " * (MAX_QUANTITY_CHAR_LEN - quantityLen)
    result = result + priceStr + " " * (MAX_QUANTITY_CHAR_LEN - priceLen)

    result = result + "<BR>"

    return result
