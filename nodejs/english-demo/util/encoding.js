let iconv = require('iconv-lite');

function CalcGbkLenForPrint(data) {
    let gbkData = iconv.encode(data, 'GBK');
    return gbkData.length;
}

function CalcAsciiLenForPrint(data) {
    return data.length;
}

module.exports = {CalcGbkLenForPrint, CalcAsciiLenForPrint};