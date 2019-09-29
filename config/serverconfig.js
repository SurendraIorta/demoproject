const serverDetails =   {
    "url"           :   "http://localhost",
    "port"          :   5001
    
}

const dbDetails     =   {
    "url"           :   "mongodb://localhost:27017/iorta_wallet",
    "port"          :   27017,
    "dbName"        :   "transactiondemo",
    "options"       :    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true,
        useUnifiedTopology: true 
    }
}



module.exports  =   {
    serverDetails   :   serverDetails,
    dbDetails       :   dbDetails
}