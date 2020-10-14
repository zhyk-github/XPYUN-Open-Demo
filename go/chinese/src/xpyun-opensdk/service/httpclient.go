package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xpyun-opensdk/model"
)

/**
 * 发送http的json请求
 *
 * @param url 请求url
 * @param jsonStr 发送的json字符串
 *
 */
func HttpPostJson(url string, data interface{}) *model.XPYunResp {
	b, _ := json.Marshal(data)

	fmt.Println(string(b))

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(b))
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(fmt.Sprintf("post json error:%+v", err))
	}

	result := model.XPYunResp{
		HttpStatusCode: resp.StatusCode,
	}

	var content model.XPYunRespContent
	err = json.Unmarshal(body, &content)
	if err == nil {
		result.Content = &content
	} else {
		fmt.Println(fmt.Sprintf("unmarshal body failed, error:%+v", err))
	}

	return &result
}
