var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


var server = app.listen(55555, function(){
    console.log('This server is running on the port ' + this.address().port);
});


app.use(express.static( path.join( __dirname, 'public') ) );



app.get('/', function(req, res){
    console.log('hello');
    console.log(req.sessionID);


    res.send(req.sessionID);

});

app.post('/enroll', function(req, res){
    console.log(req.body);
    req.session.userID = req.body.account;
    //console.log( req.session.userID );
    //console.log(req.body.account);
    res.send('ok');
});

app.get('/userID', function(req, res){
    console.log(req.session.userID);
    res.send(req.session.userID);
});
