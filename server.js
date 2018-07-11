var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
var env = require('dotenv').load();

var pagos = require("./routes/pagos");

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:57770');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Models
var models = require("./models");

//Sync Database
models.sequelize.sync({
    force: false
}).then(function () {
    console.log('Todo marcha bien Milhouse!')
}).catch(function (err) {
    console.log(err, "Algo salió mal al actualizar la Base de Datos")
});
 
//Routes   
app.use("/api/pagos", pagos);
 
app.get('/', function(req, res) {
    res.send('Hola Mundo');
});
 
//Port Config
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function(err) {
 
    if (!err)
        console.log("Server started, listening at localhost:", app.get('port'));
    else console.log(err)
 
});