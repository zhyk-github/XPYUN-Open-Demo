
var crypto = require('crypto');

/**
 * hash sign
 * @param signSource - the string for sign
 * @return
 */
function sign(signSource) {
    signature = crypto.createHash('sha1').update(signSource).digest('hex');

    return signature;
}   

/**
 * get millisecond
*/
function getMillisecond() {
    return new Date().getTime();
} 

/**
 * generate repeated string
 * @param str - the source string
 * @param repeatTimes - repeated times
*/
function strRepeat(str, repeatTimes) {
    len = repeatTimes + 1  
    return new Array(len).join(str);
}

module.exports = {sign, getMillisecond, strRepeat};