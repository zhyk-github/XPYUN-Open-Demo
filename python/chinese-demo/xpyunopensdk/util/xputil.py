"""
 哈稀签名
 @param source - 源字符串
 @return
"""
import hashlib
import time


def sign(source: str):
    sha = hashlib.sha1(source.encode('utf-8'))
    signature = sha.hexdigest()
    return signature


# 获得毫秒数
def getMillisecond():
    t = time.time()
    return int(round(t * 1000))

# 字符串重复多次
def strRepeat(str, times):
    return str * times
