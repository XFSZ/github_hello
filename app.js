var express = require('express')
var jquery = require('jquery')
var xlsx2json = require("node-xlsx");
var fs = require('fs')
var todo = require('./todo')
var bodyParser = require('body-parser');
var multer  = require('multer');
var nodejieba = require("nodejieba");
var exec = require('child_process').exec;
var exceldata = []
var txtdata = []
var worddata = []
var idlength = 0
var filename = 'fencitongji.py'
var pythonscriptname = 'SearchWord.py'
var arg1 = ''
var judgement = true;
var filepath= ''
//global 全局变量
var app = express()

var readDataFromfile = function(){

    var filetojsonStr = fs.readFileSync(__dirname + '/data.json','utf8')
    var tempObj = JSON.parse(filetojsonStr)
    global.idlength = tempObj.data.length
    global.data = tempObj.data

}

readDataFromfile()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('excelfile'));
//app.use(multer({ dest: '/tmp/'}).array('file'));
//app.use(express.static('node_modules'))

app.engine('.html',require('ejs').__express);
app.set('view engine','html');
app.get('/',function(req,res){
    res.render('index')
})
app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 })
 
 app.post('/file_upload', function (req, res) {
    
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = __dirname + "/Excel/" + req.files[0].originalname;
    var des_file2 = __dirname +"/" + req.files[0].originalname;
    filepath = req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file2, data, function (err) {
          console.log(judgement);
          if( err ){
               console.log( err );
          }else{
            if ( req.files[0].originalname.split(".")[1] == "txt"){
                judgement = false;
                console.log(req.files[0].originalname.split(".")[1])
            }
            if(judgement == false){

                exec('python'+' '+filename+' '+ req.files[0].originalname,function(err,stdout,stderr){
                    if(err)
                    {
                        console.log('stderr',err);
                    }
                    if(stdout)
                    {
                        console.log('stdout',stdout);
                           txtdata = stdout
                    }
                
                });
                response = {                                    
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
            }
            else{
                var list = xlsx2json.parse(__dirname  + req.files[0].originalname );
               // console.log(list);
                exceldata = list;
                    response = {                                    
                        message:'File uploaded successfully', 
                        filename:req.files[0].originalname
                   };
               }
            }       
           console.log( response );         
           res.end( JSON.stringify( response ) );
        });
    });
 })
 app.get('/get/:Word',function(req,res){
    var task = queryByWord(req.params.Word)
    res.send(task)
})
var queryByWord = function(Word){
    var task = null
    console.log(filepath);
    exec('python'+' '+pythonscriptname+' '+ Word+' '+filepath,function(err,stdout,stderr){
        console.log('python'+' '+pythonscriptname+' '+ Word+' '+ filepath);
        if(err)
        {
            console.log('stderr',err);
        }
        if(stdout)
        {
            console.log('stdout',stdout);
            task = stdout
            worddata = stdout
        }
    
    });
    response = {                                    
        message:'File uploaded successfully',
        word:  worddata
        //filename:req.files[0].originalname
   };
   console.log( response );         
  // res.end( JSON.stringify( response ) );
	return task
}
 
 
app.use('/todo',todo)
app.get('/list', function (req, res) {
    res.send(exceldata)
})
app.get('/txtlist', function (req, res) {
    res.send(txtdata)
})
app.get('/wordlist', function (req, res) {
    res.send(worddata)
})
app.get('*',function(req,res){
   
    res.send('404!')
})
var server = app.listen(8888, function () {
    
      var host = server.address().address
      var port = server.address().port
    
      console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
    })
//app.listen(8888)
//console.log('server is running in localhost:8888')

