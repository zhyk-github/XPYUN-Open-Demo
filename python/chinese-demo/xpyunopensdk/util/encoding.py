def CalcGbkLenForPrint(data):
    # print("len = " + str(len(data.encode("GBK")) * 2))
    return len(data.encode("GBK"))


def CalcAsciiLenForPrint(data):
    return len(data)
