var express = require('express')
var jquery = require('jquery')
var router = express.Router()
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick: true })
var fs = require('fs')

var imgCount = null
var namecount = 0
var writeDataTofile = function () {
    var temp = { data: data, idlength: idlength }
    var jsonStr = JSON.stringify(temp)
    fs.writeFileSync(__dirname + '/data.json', jsonStr, 'utf8')
}

function  read_directory(path,  next)  {
    fs.readdir("./public/img/",  function  (err,  files)  {
        var  count  =  files.length,     
            results  =  {};
        files.forEach(function  (filename)  {
            fs.readFile(filename,  function  (datadata)  {
                results[filename]  =  "/img/" + filename;
                count--;
                if  (count  <=  0)  {
                    next( results );
                }
            });
        });
    });
}


function  read_directories(name,  next)  {
    var  count  =  name.length,
        datadata  =  {};
    name.forEach(function  (path)  {
        read_directory(path,  function  (results)  {
            datadata[path]  =  results;
            count--;
            if  (count  <=  0)  {
                next(datadata);
            }
        });
    });
}
/*
read_directories(['name', 'name2', 'name3'] , function  (datadata)  {//其中name=name2=name3  
    var  fileName = datadata.name;
    var  fileNum  =  0;
    for (var  key  in  fileName) {
        if (fileName.hasOwnProperty(key)) {
            fileNum++;
        }
    }
    var suoluetu = 0;
    fs.readdir("./public/imggm/",  function  (err,  files)  {//读取文件夹下文件 
        suoluetu = files.length

    })
    for (var  i  in  fileName) {
        var taskcount = { id: namecount, name:fileName[i] , content:i, jokname: "/imggm/"+i };
        data.push(taskcount)
        idlength =  namecount
        namecount++;
        if(suoluetu <10){
             imageMagick("./public"+fileName[i])
            .resize(1280,720,"!")     //设置压缩后的w/h
            .setFormat('JPG')
            .quality(30)       //设置压缩质量: 0-100
            .strip()
            .autoOrient()
            .write("./public/imggm/"+i , 
            function(err){console.log("err: " + err);})}
       
        console.log("the image name is:{" +  i  + "} and the path is:{" + fileName[i] + "}");
    }
});

fs.readdir("./public/img/",  function  (err,  files)  {//读取文件夹下文件  
    var  count  =  files.length,
    // idlength = count
        results  = new  Array() ;
        imgCount = count
    files.forEach(function  (filename)  {
        fs.readFile(filename,  function  (datadata)  {
            var  tmpResult = {};
            tmpResult["imageName"] = filename;
            tmpResult["imagePath"]  =  "/img/" + filename;
            results[count - 1] = tmpResult ;
            count--;        
            if  (count  <=  0)  {
                console.log(results);
                console.log(results[1].imageName);
            }
        });
    });
});
*/
router.get('/list', function (req, res) {
    res.send(data)
})
router.get('/exit', function (req, res) {
    writeDataTofile()
    res.send('Bye!')
    process.exit()
})

module.exports = router;