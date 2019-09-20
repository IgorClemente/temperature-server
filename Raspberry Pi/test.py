import time
def dummy() :
    out = '';
    for i in range(0,10) :
        out += str(i + 1) + ", "
        time.sleep(0.1)
    print 'dddddd'
if __name__ =='__main__' :
    dummy = dummy()
