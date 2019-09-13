let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;

var transactionModel    =   require('./model');
var usersModel          =   require('../../users/model');

let config      = require('../../../config/serverconfig');

let statusOptions       =   {"Success":"Success","Failed":"Failed","Pending":"Pending"};
let transactionTypes    =   { "Cash":"Cash" , "Cheque":"Cheque" , "Digital payment":"Digital payment"};


/**
 * Surendra Waso - 12/09/2019
 * Save the transaction details
 * req:{
	"sender":"walletuser",
	"receiver":"receiveruser",
	"amount":"050",
	"transactionType":"cash"
}
 */
let saveTransaction     =   (req,res)=>{

    let allParams       =   req.body;
    console.log("req received",allParams,req.params);
    return new Promise((resolve,reject)=>{
            if(!allParams.sender){
               reject("Sender value is mandatory.");
            }
            else if(!allParams.receiver){
                reject("Receiver value is mandatory.");
            }
            else if(!allParams.amount){
                reject("Transaction Amount value is mandatory.");
            }
            else if(!allParams.transactionType){
                reject("Transaction type value is mandatory.");
            }else{
                resolve(null);
            }
    })
    .then(()=>{
        let reqObj  =   {
        "username"  :   allParams.sender
        };
        usersModel.find(reqObj) 
        .then((userDetails)=>{
            // console.log("userDetails ",userDetails)
            if(userDetails.length == 0){
                res.status(200).json({
                    status: true,
                    message: "Invalid sender please check the username",
                    data:null
                })
            }else{
            reqObj  =   {
                "username"  :   allParams.receiver
            }
            usersModel.find(reqObj) 
            .then((receiverDetails)=>{
                // console.log("userDetails ",receiverDetails)
                if(receiverDetails.length == 0){
                    res.status(200).json({
                        status: true,
                        message: "Invalid receiver value.",
                        data:null
                    });
                }else{
                    return {"sender":userDetails[0],"receiver":receiverDetails[0]};
                }
            })
            .then((senderReceiverDetails)=>{
                console.log("senderReceiverDetails out ",senderReceiverDetails)
                var conn = mongoose.createConnection(config.dbDetails.url)
                conn.on('open', async function () {
                    var collectionDetails = await conn.db.listCollections().toArray();
                    console.log("collectionDetails is array",Array.isArray(collectionDetails))
                    if(Array.isArray(collectionDetails)){
                        var today   =   new Date();
                        var currentCollectionName   =   today.getMonth()+"-"+today.getFullYear()+"-transactions";
                        var currentTransactionModel =   mongoose.model(currentCollectionName, transactionModel.TransactionSchema);
                        if(collectionDetails.find(function(collection){return collection.name == currentCollectionName;})){
                          //Collection exists
                           
                        }else{
                            //Collection does not exist
                        }
                        // console.log("senderReceiverDetails in ",senderReceiverDetails)
                        if(senderReceiverDetails.sender.balance < allParams.amount){

                            var newTransaction  =   new currentTransactionModel({
                                sender: senderReceiverDetails.sender._id,
                                receiver: senderReceiverDetails.receiver._id,
                                amount:allParams.amount,
                                time:new Date(),
                                status:statusOptions.Failed,
                                transactionType:allParams.transactionType,
                                createdBy: senderReceiverDetails.sender._id,
                                updatedBy: senderReceiverDetails.sender._id
                            })
                            newTransaction.save(function(err,transactionDetails){
                                if(!err){
                                    res.status(200).json({status: true,message: "Insufficient balance.",data:null});
                                }else{
                                    res.status(200).json({ status: false, message: "Transaction Failed", data: err });
                                }
                            })
                            
                        }else{
                            var newTransaction  =   new currentTransactionModel({
                                sender: senderReceiverDetails.sender._id,
                                receiver: senderReceiverDetails.receiver._id,
                                amount:allParams.amount,
                                time:new Date(),
                                status:statusOptions.Success,
                                transactionType:allParams.transactionType,
                                createdBy: senderReceiverDetails.sender._id,
                                updatedBy: senderReceiverDetails.sender._id
                            })
                            
                            newTransaction.save(function(err,transactionDetails){
                                if(!err){
                                    usersModel.findByIdAndUpdate(senderReceiverDetails.sender._id,{balance:senderReceiverDetails.sender.balance - transactionDetails.amount})
                                    .then((updateData)=>{
                                        console.log(updateData);
                                    })
                                    usersModel.findByIdAndUpdate(senderReceiverDetails.receiver._id,{balance:senderReceiverDetails.receiver.balance + transactionDetails.amount})
                                    .then((updateData)=>{
                                        console.log(updateData);
                                    })
                                    res.status(200).json({ status: true, message: "Transaction Successful", data: transactionDetails });
                                }else{
                                    res.status(200).json({ status: false, message: "Transaction Failed", data: err });
                                }
                            })
                        }
                    }else{
                        //some error
                    }
                });                    
            })
        }
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err
            });
        })
        
    })
    .catch((errMsg)=>{
        res.status(400).json({
            status: false,
            message: errMsg
        });
    })
}

/**
 * Surendra Waso - 12/09/2019
 * Function to get all collection names 
 */
let getAllCollections   =   () => {
    var allCollections  =   [];
    var conn = mongoose.createConnection(config.dbDetails.url)
    conn.on('open', async function () {
        var collectionDetails = await conn.db.listCollections().toArray();
        console.log("collectionDetails is array",Array.isArray(collectionDetails))
        if(Array.isArray(collectionDetails)){
            collectionDetails.forEach(function(collection){
                allCollections.push(collection.name);
            });
            return allCollections;
        }

            return collectionDetails;
    });

}

let testCode            =   (req,res) => {
    var allCollections  =   [];
    var conn = mongoose.createConnection(config.dbDetails.url)
    conn.on('open', async function () {
        var testData = await conn.db.listCollections().toArray();
        console.log("testDAta is array",Array.isArray(testData))
            return testData;
    });
}



module.exports = {
    saveTransaction,
    testCode
};