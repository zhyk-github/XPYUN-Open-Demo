package util

import (
	"bytes"
	"io/ioutil"

	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

func CalcGbkLenForPrint(data string) int {
	gbk, err := Utf8ToGbk(data)
	if err != nil {
		return 0
	}

	return len(gbk)
}

func CalcAsciiLenForPrint(data string) int {
	return len(data)
}

func Utf8ToGbk(s string) (string, error) {
	reader := transform.NewReader(bytes.NewReader([]byte(s)), simplifiedchinese.GBK.NewEncoder())
	d, e := ioutil.ReadAll(reader)
	if e != nil {
		return "", e
	}
	return string(d), nil
}
