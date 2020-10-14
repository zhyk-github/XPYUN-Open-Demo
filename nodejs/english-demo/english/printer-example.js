var model = require('../model/model.js');
var util = require('../util/xputil.js');
var service = require('../service/xpyunservice.js');
var formatter = require('../formatter/note-formatter.js');

const USER_NAME = '362657746@qq.com';
const USER_KEY = 'd572cab55de44e52b2e6214f7a012cb7';
const OK_PRINTER_SN = '35L8WLAHB12BD48';

/**
 * sample for receipt using font and alignment in nest,don't support voice broadcast
 * notice: 1. do not nested use alignment elements like L C R CB. for example, <L><C>your text<C/><L/>,
 * element C inside will be valid while element L will be invalid
 * 2. do not use multiple alignment elements in the same. for example, <L>left<L/><C>center<C/>,
 * only the last alignment element C is valid
 */

async function printFontAlign() {


    /**
     * 〈BR〉: line break (if there is a closing tag (e.g. 〈/C〉), it should be placed in front of the closing tag, two consecutive line breaks indicate adding a null string.
     * 〈L〉〈/L〉: left aligned
     * 〈C〉〈/C〉: center aligned
     * 〈R〉〈/R〉: right aligned
     * 〈N〉〈/C〉: normal font size
     * 〈HB〉〈/HB〉: double font in height
     * 〈WB〉〈/WB〉: double font in width
     * 〈B〉〈/B〉: double font in size
     * 〈CB〉〈/CB〉: double font in size centred
     * 〈HB2〉〈/HB2〉: three times the font in height
     * 〈WB2〉〈/WB2〉: three times the font in width
     * 〈B2〉〈/B2〉: three times the font in size
     * 〈BOLD〉〈/BOLD〉: bold font
     * 〈LOGO〉〈/LOGO〉: logo (the tag content is a character string in Base64 format, temporarily not opened)
     * 〈OR〉〈/QR〉: QR code (the tag content is a value of QR code, which cannot exceed 256 characters)
     * 〈BARCODE〉〈/BARCODE〉: barcode (the content is a value of barcode)
     * 〈CUT〉: cutter command (active paper cutting, only valid for cutter printer. Note: the print order of cutter printer has a cutter instruction by default in the end.)
     */


let printContent= `no element：default font<BR>
<BR>
L element: <L>left<BR></L>
<BR>
R element: <R>right<BR></R>
<BR>
C element: <C>center<BR></C>
<BR>
N element：<N>normal font size<BR></N>
<BR>
HB element: <HB>double font height<BR></HB>
<BR>
WB element: <WB>double font width<BR></WB>
<BR>
B element: <B>double font size<BR></B>
<BR>
HB2 element: <HB2>triple font height<BR></HB2>
<BR>
WB2 element: <WB2>triple font width<BR></WB2>
<BR>
B2 element: <B2>triple font size<BR></B2>
<BR>
BOLD element: <BOLD>bold font<BR></BOLD>`



    printContent=printContent + '<BR>';
    // neseted using font and align element
    printContent=printContent + '<C>nested use:<BOLD>center bold</BOLD><BR></C>';

    // print barcode and QR
    printContent=printContent+'<BR>';
    printContent=printContent+'<C><BARCODE>9884822189</BARCODE></C>';
    printContent=printContent+'<C><QR>https://www.xpyun.net</QR></C>';

    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*Required*: The serial number of the printer
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	//*Required*: The content to be printed can’t exceed 12288 bytes.
	request.content=printContent;

	//The number of printed copies is 1 by default.
	request.copies=1;

    //Print mode:
    //If the value is 0 or not specified, it will check whether the printer is online. If not online, it will not generate a print order and directly return the status code of an offline device.
    //If online, it will generate a print order and return the print order number.If the value is 1, it will not check whether the printer is online, directly generate a print order and return the print order number.
    //If the printer is not online, the order will be cached in the print queue and will be printed automatically when the printer is normally online.
    request.mode=0;

    let result = await service.xpYunPrint(request);
	console.log(result.httpStatusCode);
	console.log(result.content);
	console.log(result.content.code);
	console.log(result.content.msg);

  //resp.data: Return to order No. correctly   
	console.log(result.content.data);	
}

/**
 * sample for receipt using font and alignment in nest,support voice broadcast
 * notice: 1. do not nested use alignment elements like L C R CB. for example, <L><C>your text<C/><L/>,
 * element C inside will be valid while element L will be invalid
 * 2. do not use multiple alignment elements in the same. for example, <L>left<L/><C>center<C/>,
 * only the last alignment element C is valid
 */
async function printFontAlignVoiceSupport() {

    /**
     * 〈BR〉: line break (if there is a closing tag (e.g. 〈/C〉), it should be placed in front of the closing tag, two consecutive line breaks indicate adding a null string.
     * 〈L〉〈/L〉: left aligned
     * 〈C〉〈/C〉: center aligned
     * 〈R〉〈/R〉: right aligned
     * 〈N〉〈/C〉: normal font size
     * 〈HB〉〈/HB〉: double font in height
     * 〈WB〉〈/WB〉: double font in width
     * 〈B〉〈/B〉: double font in size
     * 〈CB〉〈/CB〉: double font in size centred
     * 〈HB2〉〈/HB2〉: three times the font in height
     * 〈WB2〉〈/WB2〉: three times the font in width
     * 〈B2〉〈/B2〉: three times the font in size
     * 〈BOLD〉〈/BOLD〉: bold font
     * 〈LOGO〉〈/LOGO〉: logo (the tag content is a character string in Base64 format, temporarily not opened)
     * 〈OR〉〈/QR〉: QR code (the tag content is a value of QR code, which cannot exceed 256 characters)
     * 〈BARCODE〉〈/BARCODE〉: barcode (the content is a value of barcode)
     * 〈CUT〉: cutter command (active paper cutting, only valid for cutter printer. Note: the print order of cutter printer has a cutter instruction by default in the end.)
     */


let printContent= `no element：default font<BR>
<BR>
L element: <L>left<BR></L>
<BR>
R element: <R>right<BR></R>
<BR>
C element: <C>center<BR></C>
<BR>
N element：<N>normal font size<BR></N>
<BR>
HB element: <HB>double font height<BR></HB>
<BR>
WB element: <WB>double font width<BR></WB>
<BR>
B element: <B>double font size<BR></B>
<BR>
HB2 element: <HB2>triple font height<BR></HB2>
<BR>
WB2 element: <WB2>triple font width<BR></WB2>
<BR>
B2 element: <B2>triple font size<BR></B2>
<BR>
BOLD element: <BOLD>bold font<BR></BOLD>`



    printContent=printContent + '<BR>';
    // neseted using font and align element
    printContent=printContent + '<C>nested use:<BOLD>center bold</BOLD><BR></C>';

    // print barcode and QR
    printContent=printContent+'<BR>';
    printContent=printContent+'<C><BARCODE>9884822189</BARCODE></C>';
    printContent=printContent+'<C><QR>https://www.xpyun.net</QR></C>';

    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*Required*: The serial number of the printer
	request.sn = OK_PRINTER_SN;
	request.generateSign();

	//*Required*: The content to be printed can’t exceed 12288 bytes.
	request.content=printContent;

	//The number of printed copies is 1 by default.
	request.copies=1;

    //Print mode:
    //If the value is 0 or not specified, it will check whether the printer is online. If not online, it will not generate a print order and directly return the status code of an offline device.
    //If online, it will generate a print order and return the print order number.If the value is 1, it will not check whether the printer is online, directly generate a print order and return the print order number.
    //If the printer is not online, the order will be cached in the print queue and will be printed automatically when the printer is normally online.
    request.mode=0;

    //payment method:
    //Value range 41~55:
    //Alipay 41, WeChat 42, Cloud Payment 43, UnionPay Swipe 44, UnionPay Payment 45, Member Card Consumption 46, Member Card Recharge 47, Yipay 48, Successful Collection 49, Jialian Payment 50, One Wallet 51, JD Pay 52, Quick money payment 53, Granville payment 54, Xiangqian payment 55
    //It is only used for Xinye cloud printers that support the amount broadcast.
    request.payType=41;

    //Pay or not:
    //Value range 59~61:
    //Refund 59 to account 60 consumption 61.
    //It is only used for Xinye cloud printers that support the amount broadcast.

    request.payMode=60;

    //Payment amount:
    //Up to 2 decimal places are allowed.
    //It is only used for Xinye cloud printers that support the amount broadcast.
    request.money=20.15;

    let result = await service.xpYunPrint(request);
	console.log(result.httpStatusCode);
	console.log(result.content);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data: Return to order No. correctly     
	console.log(result.content.data);	
}

/**
 * complex alignment sample for note,don't support voice broadcast
 * notice: 58mm printer can print 32 characters per line
 */
async function printComplexReceipt() {
    /**
     * 〈BR〉: line break (if there is a closing tag (e.g. 〈/C〉), it should be placed in front of the closing tag, two consecutive line breaks indicate adding a null string.
     * 〈L〉〈/L〉: left aligned
     * 〈C〉〈/C〉: center aligned
     * 〈R〉〈/R〉: right aligned
     * 〈N〉〈/C〉: normal font size
     * 〈HB〉〈/HB〉: double font in height
     * 〈WB〉〈/WB〉: double font in width
     * 〈B〉〈/B〉: double font in size
     * 〈CB〉〈/CB〉: double font in size centred
     * 〈HB2〉〈/HB2〉: three times the font in height
     * 〈WB2〉〈/WB2〉: three times the font in width
     * 〈B2〉〈/B2〉: three times the font in size
     * 〈BOLD〉〈/BOLD〉: bold font
     * 〈LOGO〉〈/LOGO〉: logo (the tag content is a character string in Base64 format, temporarily not opened)
     * 〈OR〉〈/QR〉: QR code (the tag content is a value of QR code, which cannot exceed 256 characters)
     * 〈BARCODE〉〈/BARCODE〉: barcode (the content is a value of barcode)
     * 〈CUT〉: cutter command (active paper cutting, only valid for cutter printer. Note: the print order of cutter printer has a cutter instruction by default in the end.)
     */
    let printContent = "";

    printContent = printContent + "<C>" + "<B>xpyun receipt</B>" + "<BR></C>";
    printContent = printContent + "<BR>";

    printContent = printContent + "name" + util.strRepeat(" ", 16) + "count" + util.strRepeat(" ", 2) + "price" + util.strRepeat(" ", 2)
        + "<BR>";
    printContent = printContent + util.strRepeat("-", 32) + "<BR>";
    printContent = printContent + formatter.formatPrintOrderItem("Stewed Ribs", 2, 9.99);
    printContent = printContent + formatter.formatPrintOrderItem("Boiled Fish", 1, 108.0);
    printContent = printContent + formatter.formatPrintOrderItem("Braised Codfish with Mushrooms", 1, 99.9);
    printContent = printContent + formatter.formatPrintOrderItem("Braised Squid", 5, 19.99);
    printContent = printContent + util.strRepeat("-", 32) + "<BR>";
    printContent = printContent + "<R>" + "total：" + "327.83" + "RMB" + "<BR></R>";

    printContent = printContent + "<BR>";
    printContent = printContent + "<L>"
            + "address:" + "Broadway, New York City" + "<BR>"
            + "phone:" + "1363*****88" + "<BR>"
            + "orderTime:" + "2020-9-9 15:07:57" + "<BR>"
            + "remarks:" + "Less spicy" + "<BR>";

    printContent = printContent + "<C>"
            + "<QR>https://www.xpyun.net</QR>"
            + "</C>";


    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*Required*: The serial number of the printer
	request.sn = OK_PRINTER_SN;   

    request.generateSign();

    //*Required*: The content to be printed can’t exceed 12288 bytes.
    request.content=printContent;

    //Print mode:
    //If the value is 0 or not specified, it will check whether the printer is online. If not online, it will not generate a print order and directly return the status code of an offline device.
    //If online, it will generate a print order and return the print order number.If the value is 1, it will not check whether the printer is online, directly generate a print order and return the print order number.
    //If the printer is not online, the order will be cached in the print queue and will be printed automatically when the printer is normally online.
    request.mode=0;   
     
    //The number of printed copies is 1 by default.
    request.copies=1;

    let result = await service.xpYunPrint(request);
	console.log(result.httpStatusCode);
	console.log(result.content);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data: Return to order No. correctly  
	console.log(result.content.data);	
}

/**
 * complex alignment sample for note,support voice broadcast
 * notice: 58mm printer can print 32 characters per line
 */

async function printComplexReceiptVoiceSupport() {
    /**
     * 〈BR〉: line break (if there is a closing tag (e.g. 〈/C〉), it should be placed in front of the closing tag, two consecutive line breaks indicate adding a null string.
     * 〈L〉〈/L〉: left aligned
     * 〈C〉〈/C〉: center aligned
     * 〈R〉〈/R〉: right aligned
     * 〈N〉〈/C〉: normal font size
     * 〈HB〉〈/HB〉: double font in height
     * 〈WB〉〈/WB〉: double font in width
     * 〈B〉〈/B〉: double font in size
     * 〈CB〉〈/CB〉: double font in size centred
     * 〈HB2〉〈/HB2〉: three times the font in height
     * 〈WB2〉〈/WB2〉: three times the font in width
     * 〈B2〉〈/B2〉: three times the font in size
     * 〈BOLD〉〈/BOLD〉: bold font
     * 〈LOGO〉〈/LOGO〉: logo (the tag content is a character string in Base64 format, temporarily not opened)
     * 〈OR〉〈/QR〉: QR code (the tag content is a value of QR code, which cannot exceed 256 characters)
     * 〈BARCODE〉〈/BARCODE〉: barcode (the content is a value of barcode)
     * 〈CUT〉: cutter command (active paper cutting, only valid for cutter printer. Note: the print order of cutter printer has a cutter instruction by default in the end.)
     */

    let printContent = "";

    printContent = printContent + "<C>" + "<B>xpyun receipt</B>" + "<BR></C>";
    printContent = printContent + "<BR>";

    printContent = printContent + "name" + util.strRepeat(" ", 16) + "count" + util.strRepeat(" ", 2) + "price" + util.strRepeat(" ", 2)
        + "<BR>";
    printContent = printContent + util.strRepeat("-", 32) + "<BR>";
    printContent = printContent + formatter.formatPrintOrderItem("Stewed Ribs", 2, 9.99);
    printContent = printContent + formatter.formatPrintOrderItem("Boiled Fish", 1, 108.0);
    printContent = printContent + formatter.formatPrintOrderItem("Braised Codfish with Mushrooms", 1, 99.9);
    printContent = printContent + formatter.formatPrintOrderItem("Braised Squid", 5, 19.99);
    printContent = printContent + util.strRepeat("-", 32) + "<BR>";
    printContent = printContent + "<R>" + "total：" + "327.83" + "RMB" + "<BR></R>";

    printContent = printContent + "<BR>";
    printContent = printContent + "<L>"
            + "address:" + "Broadway, New York City" + "<BR>"
            + "phone:" + "1363*****88" + "<BR>"
            + "orderTime:" + "2020-9-9 15:07:57" + "<BR>"
            + "remarks:" + "Less spicy" + "<BR>";

    printContent = printContent + "<C>"
            + "<QR>https://www.xpyun.net</QR>"
            + "</C>";


    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*Required*: The serial number of the printer
	request.sn = OK_PRINTER_SN;   

    request.generateSign();

    //*Required*: The content to be printed can’t exceed 12288 bytes.
    request.content=printContent;

    //The number of printed copies is 1 by default.
    request.copies=1;

    //Print mode:
    //If the value is 0 or not specified, it will check whether the printer is online. If not online, it will not generate a print order and directly return the status code of an offline device.
    //If online, it will generate a print order and return the print order number.If the value is 1, it will not check whether the printer is online, directly generate a print order and return the print order number.
    //If the printer is not online, the order will be cached in the print queue and will be printed automatically when the printer is normally online.
    request.mode=0;
    
    //payment method:
    //Value range 41~55:
    //Alipay 41, WeChat 42, Cloud Payment 43, UnionPay Swipe 44, UnionPay Payment 45, Member Card Consumption 46, Member Card Recharge 47, Yipay 48, Successful Collection 49, Jialian Payment 50, One Wallet 51, JD Pay 52, Quick money payment 53, Granville payment 54, Xiangqian payment 55
    //It is only used for Xinye cloud printers that support the amount broadcast
    request.payType=41;

    //Pay or not:
    //Value range 59~61:
    //Refund 59 to account 60 consumption 61.
    //It is only used for Xinye cloud printers that support the amount broadcast.
    request.payMode=60;

    //Payment amount:
    //Up to 2 decimal places are allowed.
    //It is only used for Xinye cloud printers that support the amount broadcast.
    request.money=20.15;        

    let result = await service.xpYunPrint(request);
	console.log(result.httpStatusCode);
	console.log(result.content);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data: Return to order No. correctly    
	console.log(result.content.data);	
}

/**
 * comprehensive layout sample for label printing
 * How to determine the coordinates?
 * The origin of the coordinates is at the upper left corner, the x-axis is from left to right,
 * and the y-axis is from top to bottom;
 * According to the test, the maximum value of the x-axis is equal to the width of the label paper
 * multiplied by 8, and the maximum value of the y-axis is equal to the height of the label paper multiplied by 8.
 * For example, the label size is 40*30, the maximum value of x-axis=40*8=320, the maximum value of y-axis=30*8=240
 * Users need to typeset according to actual paper size and their requirements
 *
 * The greater than and less than signs in the printed content (except labels) need to be translated before they can be printed normally.
 * Among them, "<" is represented by "&lt", and ">" is represented by "&gt"; 1mm=8dots.
 */
async function printLabel() {
    /**
     * <PAGE></PAGE>：
     *  Pagination, used to support the printing of multiple different label pages (up to 10 sheets), not using this label means that all elements are only printed on one label page
     *
     *  <SIZE>width,height</SIZE>：
     *  Set label paper width and height, width label paper width (excluding backing paper), height label paper height (excluding backing paper), unit mm, such as<SIZE>40,30</SIZE>
     *
     *  <TEXT x="10" y="100" w="1" h="2" r="0">Text content</TEXT>：
     *  Print the text, where:
     *  The attribute x is the coordinate of the starting point in the horizontal direction (default is 0)
     *  Attribute y is the starting point coordinate in the vertical direction (default is 0)
     *  The attribute w is the text width magnification ratio 1-10 (default is 1)
     *  Attribute h is text height magnification 1-10 (default is 1)
     *  The attribute r is the rotation angle of the text (clockwise, the default is 0):
     *  0     0degree
     *  90   90degree
     *  180 180degree
     *  270 270degree
     *
     *  <BC128 x="10" y="100" h="60" s="1" n="1" w="1" r="0">1234567</BC128>：
     *  Print code128 one-dimensional code, where:
     *  The attribute x is the coordinate of the starting point in the horizontal direction (default is 0)
     *  Attribute y is the starting point coordinate in the vertical direction (default is 0)
     *  The attribute h is the height of the barcode (default is 48)
     *  Whether the attribute s can be recognized by human eyes: 0 is not recognized, 1 is recognized (default is 1)
     *  The attribute n is the width of the narrow bar, expressed in dots (default is 1)
     *  The attribute w is the width of bar, expressed in dots (default is 1)
     *  The attribute r is the text rotation angle (clockwise, the default is 0):
     *  0     0degree
     *  90   90degree
     *  180 180degree
     *  270 270degree
     *
     *  <BC39 x="10" y="100" h="60" s="1" n="1" w="1" r="0">1234567</BC39>：
     *  Print code39 one-dimensional code, where:
     *  The attribute x is the coordinate of the starting point in the horizontal direction (default is 0)
     *  Attribute y is the starting point coordinate in the vertical direction (default is 0)
     *  The attribute h is the height of the barcode (default is 48)
     *  Whether the attribute s can be recognized by human eyes: 0 is not recognized, 1 is recognized (default is 1)
     *  The attribute n is the width of the narrow bar, expressed in dots (default is 1)
     *  The attribute w is the width of bar, expressed in dots (default is 2)
     *  The attribute r is the rotation angle of the text (clockwise, the default is 0):
     *  0     0degree
     *  90   90degree
     *  180 180degree
     *  270 270degree
     *
     *  <QR x="20" y="20" w="160" e="H">QR code content</QR>：
     *  Print the QR code, where:
     *  The attribute x is the coordinate of the starting point in the horizontal direction (default is 0)
     *  Attribute y is the starting point coordinate in the vertical direction (default is 0)
     *  The attribute w is the width of the QR code (default is 160)
     *  Attribute e is the error correction level: L 7% M 15% Q 25% H 30% (the default is H)
     *  The label content is a QR code value, and the maximum cannot exceed 256 characters
     *  Note: A single order can only print one QR code
     */


    //Set size of label paper
    let printContent = "<SIZE>40,30</SIZE>";

	//print the first label
    printContent = printContent + "<PAGE>";
    printContent = printContent + '<TEXT x="8" y="8" w="1" h="1" r="0">'
                 + "#001" + util.strRepeat(" ", 4)
                 + "001" + util.strRepeat(" ", 4)
                 + "1/3"
                 + "</TEXT>"
                 + '<TEXT x="8" y="96" w="2" h="2" r="0">'
                 + "Golden Fried Rice"
                 + "</TEXT>"
                 + '<TEXT x="8" y="200" w="1" h="1" r="0">'
                 + "Miss Wang" + util.strRepeat(" ", 4)
                 + "136****3388"
                 + "</TEXT>"
                 + "</PAGE>";

	//print the second label
    printContent = printContent + "<PAGE>";
    printContent = printContent + '<TEXT x="8" y="8" w="1" h="1" r="0">'
                 + "#001" + util.strRepeat(" ", 4)
                 + "Table one" + util.strRepeat(" ", 4)
                 + "2/3"
                 + "</TEXT>"
                 + '<TEXT x="8" y="96" w="2" h="2" r="0">'
                 + "Cucumber salad"
                 + "</TEXT>"
                 + '<TEXT x="8" y="200" w="1" h="1" r="0">'
                 + "Miss Wang" + util.strRepeat(" ", 4)
                 + "136****3388"
                 + "</TEXT>"
                 + "</PAGE>";     

	//print the third label
    printContent = printContent + "<PAGE>";
    printContent = printContent + '<TEXT x="8" y="8" w="1" h="1" r="0">'
                 + "#001" + util.strRepeat(" ", 4)
                 + "Table one" + util.strRepeat(" ", 4)
                 + "3/3"
                 + "</TEXT>"
                 + '<TEXT x="8" y="96" w="2" h="2" r="0">'
                 + "Boston Lobster"
                 + "</TEXT>"
                 + '<TEXT x="8" y="200" w="1" h="1" r="0">'
                 + "Miss Wang" + util.strRepeat(" ", 4)
                 + "136****3388"
                 + "</TEXT>"
                 + "</PAGE>";  

	//print a barcode
    printContent = printContent + "<PAGE>";
    printContent = printContent + '<TEXT x="8" y="8" w="1" h="1" r="0">'
                 + "print a barcode:"
                 + "</TEXT>"
                 + '<BC128 x="16" y="32" h="32" s="1" n="2" w="2" r="0">'
                 + "12345678"
                 + '</BC128>'
                 + "</PAGE>";   

	//print a QR code. The minimum width is 128, it will not be able to be scanned if lower than 128
    printContent = printContent + "<PAGE>";
    printContent = printContent + '<TEXT x="8" y="8" w="1" h="1" r="0">'
                 + "print a QR code:"
                 + "</TEXT>"
                 + '<QR x="16" y="32" w="128">'
                 + "https://www.xpyun.net"
                 + '</QR>'
                 + "</PAGE>";

    let request = new model.PrinterRequest();
	request.user = USER_NAME;
	request.userKey = USER_KEY;

	//*Required*: The serial number of the printer
	request.sn = OK_PRINTER_SN;   

    request.generateSign();

    //*Required*: The content to be printed can’t exceed 12288 bytes.
    request.content=printContent;

    //The number of printed copies is 1 by default.
    request.copies=1;

    let result = await service.xpYunPrintLabel(request);
	console.log(result.httpStatusCode);
	console.log(result.content);
	console.log(result.content.code);
	console.log(result.content.msg);

	//resp.data: Return to order No. correctly   
	console.log(result.content.data);	
}

module.exports = {
	printFontAlign, printFontAlignVoiceSupport, printComplexReceipt,  
	printComplexReceiptVoiceSupport, printLabel
};