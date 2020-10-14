"""
 hash sign
 @param source - the string for sign
 @return
"""
import hashlib
import time


def sign(source: str):
    sha = hashlib.sha1(source.encode('utf-8'))
    signature = sha.hexdigest()
    return signature


# get millisecond
def getMillisecond():
    t = time.time()
    return int(round(t * 1000))

# repeat the string to specific times
def strRepeat(str, times):
    return str * times
