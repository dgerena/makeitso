// global access
var express = require('express'),
	connect = require('connect'),
	engine = require('ejs-locals'),
	fs = require('fs'),
	// require http request
	http = require('http'),
	// instantiate express
	app = express(),
	// create server using app
	httpServer = http.createServer(app),
	// set port
	port = 8000;

app.engine('ejs', engine);

// set templating engine to ejs (jade sucks)
app.set('view engine', 'ejs');
app.use('/views', express.static('/views'));
app.use('/views/creations', express.static('/views/creations'));
app.use('/assets', express.static(__dirname + '/assets'));

// http variables
// app.use(express.bodyParser());


// at location run function
app.get('/',function(req, res){
	res.render('index', {message: req.params.id});
});
app.get('/:page',function(req, res){
	if(fs.existsSync('views/'+req.params.page+'.ejs')){
		res.render(req.params.page, {message: req.params.id});
	}else if(req.params.page === "sitemap.xml"){
		sitemap.toXML( function (xml) {
			res.header('Content-Type', 'application/xml');
			res.send( xml );
		});
	}else{
		res.render('404');
	}
});

// starts server on specified port
httpServer.listen(port, function(){
	console.log("Port Listening on port "+port)
});



