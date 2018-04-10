# -*- coding:utf-8 -*-    
#!/usr/bin/python    
import re
import chardet
import sys
import codecs
import json
reload(sys)   
sys.setdefaultencoding('utf-8')  
#if __name__=="__main__":  
name = ''
text = ''
ki = []
#print(name)
#print(text)
name = sys.argv[1]
wordtext = sys.argv[2]
#print(type(wordtext))
#print(chardet.detect(name))
#name =  name.decode('ISO-8859-1').encode('utf-8')
name =  name.decode("gbk").encode('utf-8') 
#print("name" , chardet.detect(name))
#print(name)  
text = open(wordtext,mode='r')
#text = codecs.open(wordtext,mode='r',encoding='gbk')
#print(chardet.detect(text))
text1 = text.read()
text1 = text1.decode('gbk').encode('utf-8')
text.close()
#print(chardet.detect(text1))
#text1 =  text1.encode('utf-8')
#print("text",chardet.detect(text1))   
#name = name.decode('gbk')
#print(name)
#print(text1)
ret = '[^。]*?{}[^。]*?。'
#print(chardet.detect(ret))
#print(ret)
#print(ret)
#print(text.readlines())
#print("name" , chardet.detect(name))
#print("text",chardet.detect(text1)) 
#text1 =  text1.decode('utf-8')
results = re.findall(r'[^。]*?{}[^。]*?。'.format(name), text1)
#print(results) 
#text1 =  text1.decode('utf-8')
#print(text1)
for i, r in enumerate(results, 1):
    #print(i, r)
   # r = r.decode('utf-8')
    r =  unicode( r, errors='ignore')
    obj = {"name":r,"count": str(i)}
    #unicode( obj, errors='ignore')
    #obj = obj.decode('utf-8')
    ki.append(obj)
   
print(json.dumps(ki ))
