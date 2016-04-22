var express = require('express'),
    http = require('http'),
    path = require('path'),
    score = require('./public/scripts/scores'),
    app = express();
    
app.set('port', 2000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/v1/high-scores', score.all);
app.post('/v1/high-scores', score.add);

app.all('/v1/*', function(request, response) {
	response.writeHead(501);
	response.end();
});

http.createServer(app).listen(app.get('port'),function(){
    console.log("Tower Defense server listening on port " + app.get('port'));
});