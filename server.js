//setup Dependencies
require(__dirname + "/lib/setup").ext( __dirname + "/lib").ext( __dirname + "/lib/express/support");
var connect = require('connect'),
    express = require('express'),
    sys = require('sys'),
    io = require('socket.io'),
    port = (process.env.PORT || 8081);

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', {
        og: {},
        fb: {admins: ''},
        analyticssiteid: 'XXXXXXX'
    });
    server.use(connect.bodyParser());
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

server.dynamicHelpers({
    request: function(req){
        return req;
    }
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.ejs', { locals: { 
           header: '#Header#',
           footer: '#Footer#',
           title : '404 - Not Found',
           description: '',
           author: ''
        }, status: 404 });
    } else {
        res.render('500.ejs', { locals: { 
           header: '#Header#',
           footer: '#Footer#',
           title : 'The Server Encountered an Error',
           description: '',
           author: '',
           error: err 
        }, status: 500 });
    }
});
server.listen(port);

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function (socket) {
  socket.on('chat', function (msg) {
    io.sockets.emit('chat', msg);
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/', function(req, res){
  res.render('index.ejs', {
    locals : { 
        header: '#Header#',
        footer: '#Footer#',
        title : 'Page Title',
        description: 'Page Description',
        author: 'Your Name'
    }
  });
});


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res) {
    throw new NotFound;
});

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port);
