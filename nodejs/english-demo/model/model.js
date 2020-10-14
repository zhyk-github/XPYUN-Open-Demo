var util = require("../util/xputil.js");

class PrinterRequest {
	constructor() {
		this.debug = 0;
		this.timestamp = util.getMillisecond();		
	}    

	generateSign() {
		this.sign= util.sign(this.user + this.userKey + this.timestamp);
	}
}

class XPYunResp {


}

class XPYunRespContent {
	

}

class AddPrinterRequestItem {

}

module.exports = {PrinterRequest, XPYunResp, XPYunRespContent, AddPrinterRequestItem};