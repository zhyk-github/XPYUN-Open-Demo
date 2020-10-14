package util

import (
	"crypto/sha1"
	"fmt"
	"strings"
	"time"
)

/**
 * hash sign
 * @param signSource - the string to sign
 * @return
 */
func Sign(signSource string) string {
	h := sha1.New()
	h.Write([]byte(signSource))
	result := fmt.Sprintf("%x", h.Sum(nil))

	return result
}

//get millisecond
func GetMillisecond() int64 {
	return time.Now().UnixNano() / 1e6
}

/**
 * repeat the string to specific times
 * @param str - the string to repeat
 * @param repeatTimes - repeat times
 */
func StrRepeat(str string, repeatTimes int) string {
	return strings.Repeat(str, repeatTimes)
}
