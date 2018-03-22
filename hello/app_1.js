var express = require('express')
var jquery = require('jquery')
var fs = require('fs')
var todo = require('./todo')
//var data = []
//var idlength = 0
// global 全局变量
var app = express()
var readDataFromfile = function(){

    var filetojsonStr = fs.readFileSync(__dirname + '/data.json','utf8')
    var tempObj = JSON.parse(filetojsonStr)
   global.idlength = tempObj.data.length
   global.data = tempObj.data

}
var test = function(){
    console.log("yes")
}
readDataFromfile()
/*
var data = [{id:'1',name:'任务01'},
			{id:'2',name:'task02'},
			{id:'3',name:'task03'}
			]
*/

/*
var queryById = function(id){
	var task = null
	for(var i=0;i<data.length;i++){
		if(data[i].id == id){
			task = data[i]
			break
		}
	}
	return task
}
var delById = function(id){
    var result = null
for(var i = 0;i<data.length;i++){
    if(data[i].id == id){
        result = data[i].id
        data.splice(i,1);
        break
    }
}
}
//app.use(express.static('pathname'))
var addItem = function(taskname,task){
  //  var query = url.parse(req.url,true).query
    var id = ++idlength;
//    var taskname = query.taskname
    var task = {id:id,name:taskname,content:task}
    data.push(task) 
//	reswritehead({id:id})
//res.sendFile(__dirname+'/pathname/file')
}

var UpdateById = function(id,taskname){
 //   var query = url.parse(req.url,true).query
//    var id = query.id;
//	var taskname = query.taskname;
    var result = null
for(var i = 0;i<data.length;i++){
    if(data[i].id == id){
        result = data[i].id
		data[i].name = taskname
        break
    }
}
}*/
/*
var writeDataTofile = function(){
    var temp = {data:data,idlength:idlength}
    var jsonStr = JSON.stringify(temp)
    fs.writeFileSync(__dirname + '/data.json',jsonStr,'utf8')
}
*/

app.use(express.static('public'))
//app.use(express.static('node_modules'))

app.engine('.html',require('ejs').__express);
app.set('view engine','html');
app.get('/',function(req,res){
    res.render('index')
})
app.use('/todo',todo)
/*
app.get('/',function(req,res){
    res.send('Hello,express todo')
})
app.get('/list',function(req,res){
    res.send(data)
})
app.get('/exit',function(req,res){
    writeDataTofile()
    res.send('Bye!')
    process.exit()
})

app.get('/get',function(req,res){
    var task = queryById(req.query.id)
    res.send(task)
})
app.get('/get/:id',function(req,res){
    var task = queryById(req.params.id)
    res.send(task)
})
app.get('/del/:id',function(req,res){
    var task = delById(req.params.id)
    res.send(task)
})
app.get('/add/:taskname/:task',function(req,res){
    var id = addItem(req.params.taskname,req.params.task)
 //   var task = addItem(req.params.task)   
    res.send({id:idlength})
})
app.get('/update/:id/:taskname',function(req,res){
    var task = UpdateById(req.params.id,req.params.taskname)
    res.send({id:req.params.id,name:req.params.taskname})
})
*/
app.get('*',function(req,res){
   
    res.send('404!')
})
app.listen(8888)
console.log('server is running in localhost:8888')