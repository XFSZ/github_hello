var http = require('http')
var url = require('url')

var data = [{id:'1',name:'任务01'},
			{id:'2',name:'task02'},
			{id:'3',name:'task03'}
			]
 var reswritehead = function(res,items){	 
 res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify(items));
}
var list = function(req,res){
	res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify(data));
//	reswritehead(data)
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
var get = function(req,res){
	var query = url.parse(req.url,true).query
	console.log(query)
	var task = queryById(query.id)
	
	res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify(task));
//	reswritehead(task)
}
var add = function(req,res){
    var query = url.parse(req.url,true).query
    var id = data.length+1;
    var taskname = query.taskname
    var task = {id:id,name:taskname}
    data.push(task)

    res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify({id : id})); 
//	reswritehead({id:id})
}

var del = function(req,res){
    var query = url.parse(req.url,true).query
    var id = query.id;
    var result = null
for(var i = 0;i<data.length;i++){
    if(data[i].id == id){
        result = data[i].id
        data.splice(i,1);
        break
    }
}
  
    res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify({id : result})); 
//	reswritehead({id:result})

}

var Update = function(req,res){
    var query = url.parse(req.url,true).query
    var id = query.id;
	var taskname = query.taskname;
    var result = null
for(var i = 0;i<data.length;i++){
    if(data[i].id == id){
        result = data[i].id
		data[i].name = taskname
        break
    }
}

    res.writeHead(200,
	{'Content-Type':'application/json;charset=utf-8'})
	res.end(JSON.stringify({id : result}));
	
//	reswritehead({id:result})
}

var callback = function(req,res){
	var pathname= url.parse(req.url).pathname
	console.log(pathname)
	switch(pathname){
		case '/':
		list(req,res)
			break;
		case '/list':
			list(req,res)
			break;
		case '/get':
			get(req,res)
			break;
        case '/add' :
            add(req,res)
            break;
        case '/del' :
            del(req,res)
            break;
	    case '/update' :
            Update(req,res)
            break;
		default:
			break;
	}
}

var server = http.createServer()
server.on('request',callback)
server.listen(8888)
console.log('server running in localhost:8888')