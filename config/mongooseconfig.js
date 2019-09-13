let mongoose    = require('mongoose');
let config      = require('./serverconfig');
let chalk       = require('chalk');


mongoose.connect(config.dbDetails.url,config.dbDetails.options,function (err) {
    if(err){
        console.log(chalk.red("Error while connecting to mongo : " +err));
        process.exit(1);
    }else {
        console.log(chalk.blue("connected to mongodb : " + config.dbDetails.url));
    }
});

module.exports = mongoose;