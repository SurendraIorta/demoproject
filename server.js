var express = require('express');
var chalk   =   require('chalk');
var bodyParser = require('body-parser');
var app = express();

var configDetails   =   require('./config/serverconfig');
var router          =   require('./server/routers/router')

require('./config/mongooseconfig');

// app.use(bodyParser());//deprecated 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
 

app.use((req, res, next) => {
   
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype');

    // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    }
    else {
        // Pass to next layer of middleware
        next();
    }
});

app.use('/', router);

app.listen(configDetails.serverDetails.port);
console.log(chalk.green('Server started on port : ' + configDetails.serverDetails.port ));

module.exports = app;