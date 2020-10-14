package util

import (
	"crypto/sha1"
	"fmt"
	"strings"
	"time"
)

/**
 * 哈稀签名
 * @param signSource - 源字符串
 * @return
 */
func Sign(signSource string) string {
	h := sha1.New()
	h.Write([]byte(signSource))
	result := fmt.Sprintf("%x", h.Sum(nil))

	return result
}

//获得毫秒数
func GetMillisecond() int64 {
	return time.Now().UnixNano() / 1e6
}

/**
 * 获得字符串重复
 * @param str - 要进行重复的字符串
 * @param repeatTimes - 重复次数
 */
func StrRepeat(str string, repeatTimes int) string {
	return strings.Repeat(str, repeatTimes)
}
