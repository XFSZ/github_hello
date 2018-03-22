var express = require('express')
var jquery = require('jquery')
var router = express.Router()
var fs = require('fs')
var writeDataTofile = function(){
    var temp = {data:data,idlength:idlength}
    var jsonStr = JSON.stringify(temp)
    fs.writeFileSync(__dirname + '/data.json',jsonStr,'utf8')
}
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

var queryByName = function(name){
	var task = null
	for(var i=0;i<data.length;i++){
		if(data[i].Nname == name){
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
         idlength--
        for(var k = 0; k<idlength;k++)
        {
            data[k].id = k+1
        }     
        break
       
    }
}
}
//app.use(express.static('pathname'))
var addItem = function(taskname,task){
  //  var query = url.parse(req.url,true).query
    var id = ++idlength;
//    var taskname = query.taskname
    var task = {id:id,name:"task"+id,content:task,jokname:taskname}
    data.push(task) 
//	reswritehead({id:id})
//res.sendFile(__dirname+'/pathname/file')
}

var UpdateById = function(id,taskname,task){
 //   var query = url.parse(req.url,true).query
//    var id = query.id;
//	var taskname = query.taskname;
    var result = null
for(var i = 0;i<data.length;i++){
    if(data[i].id == id){
        
        result = data[i].id
		data[i].jokname = taskname
        data[i].content = task
        
        break
    }
}
}
router.get('/list',function(req,res){
    res.send(data)
})
router.get('/exit',function(req,res){
    writeDataTofile()
    res.send('Bye!')
    process.exit()
})
/*
app.get('/get',function(req,res){
    var task = queryById(req.query.id)
    res.send(task)
})*/
router.get('/get/:id',function(req,res){
    var task = queryById(req.params.id)
    res.send(task)
})

router.get('/getname/:name',function(req,res){
    var task = queryByName(req.params.name)
    res.send(task)
})
router.get('/del/:id',function(req,res){
    var task = delById(req.params.id)
    res.send(task)
})
router.get('/add/:taskname/:task',function(req,res){
    var id = addItem(req.params.taskname,req.params.task)
 //   var task = addItem(req.params.task)   
    res.send({id:idlength})
})
router.get('/update/:id/:taskname/:task',function(req,res){
    var task = UpdateById(req.params.id,req.params.taskname,req.params.task)
    res.send({id:req.params.id,name:req.params.taskname})
})

module.exports = router;