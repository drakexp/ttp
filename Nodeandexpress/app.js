var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
   res.render('home');  
});

app.get('/about', function (req, res) {
   res.render('about');
});

app.get('/gallery', function (req, res) {
   res.render('gallery');
});

app.listen(3000, function () {
   console.log('Inspiration app listening on port 3000!');
});