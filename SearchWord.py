# -*- coding:utf-8 -*-    
#!/usr/bin/python    
import re
import chardet
import sys
import codecs
reload(sys)   
sys.setdefaultencoding('utf-8')  
name = '乔峰'
text = '''段誉的六卖神贱，虚竹的酒色为善佛祖皆空。虚竹的酒色为善佛乔峰。降龙无敌手，丐帮帮主乔峰。'''
print(name)
print(text)
name = sys.argv[1]
print(name)
print(chardet.detect(name))
#name =  name.decode('ISO-8859-1').encode('utf-8')
name =  name.decode("gbk").encode('utf8') 
print("name" , chardet.detect(name))
print(name)  
#text = open("uiop1.txt",mode='r')
text = codecs.open("uiop1.txt",mode='r',encoding='GB2312')
text1 = text.read()
text.close()
#print(chardet.detect(text))
text1 =  text1.encode('utf-8')
print("text",chardet.detect(text1))   
#name = name.decode('gbk')
#print(name)
#print(text1)
ret = '[^。]*?{}[^。]*?。'
print(chardet.detect(ret))
print(ret)
#'[^。]*?{}[^。]*?。'
#print(ret)
#print(text.readlines())
#name = '乔峰'
#text1 = '''段誉的六卖神贱，虚竹的酒色为善佛祖皆空。虚竹的酒色为善乔峰。降龙无敌手，丐帮帮主乔峰。'''
#print("name" , chardet.detect(name))
#print("text",chardet.detect(text1)) 
#text1 =  text1.decode('utf-8')
results = re.findall(r'[^。]*?{}[^。]*?。'.format(name), text1)
print(results) 
text1 =  text1.decode('utf-8')
print(text1)
for i, r in enumerate(results, 1):
    print(i, r.decode('utf-8'))
    r= r.decode('utf-8')
    print(r)