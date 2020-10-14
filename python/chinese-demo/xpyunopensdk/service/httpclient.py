import requests
import json
import xpyunopensdk.model.model as model

"""
 发送http的json请求
 @param $url 请求url
 @param $jsonStr 发送的json字符串
 @return array
"""


def http_post_json(url, body):
    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }

    response = requests.post(url, data=json.dumps(body), headers=headers)

    result = model.XPYunResp
    result.httpStatusCode = response.status_code
    jsonObj = json.loads(response.text)
    result.content = model.XPYunRespContent
    result.content.code = jsonObj["code"]
    result.content.msg = jsonObj["msg"]
    # result.content.data = jsonObj["data"]
    result.content.serverExecutedTime = jsonObj["serverExecutedTime"]

    return result

