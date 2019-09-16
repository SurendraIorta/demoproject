let mongoose = require('mongoose');
var transactionModel    =   require('../sendmoney/model');
var usersModel          =   require('../../users/model');

/**
 * Surendra Waso - 12/09/2019
 * Save the transaction details
 * req:{
	"username":"walletuser",
    "currentpage":0,
    "lastMonthTrans":02-2019,
    "lastTransCompleted":true,
    "lastTransCount":0
	
}
 */
let getTransactionDetails     =   (req,res)=>{

    let allParams       =   req.body;
    let pageSize        =   10;
    console.log("req received",allParams,req.params);
    return new Promise((resolve,reject)=>{
            if(!allParams.username){
               reject("Username is mandatory.");
            }
            else if(!allParams.currentpage && allParams.currentpage != 0){
                reject("Current page number is mandatory.");
            }
            else if(!allParams.lastMonthTrans){
                reject("lastMonthTrans value is mandatory.");
            }
            else if(!allParams.lastTransCompleted){
                reject("lastTransCompleted value is not valid.");
            }else if(!allParams.lastTransCount && allParams.lastTransCount !== 0){
                reject("lastTransCount value is not valid.");
            }else{
                resolve(null);
            }
    })
    .then(()=>{
        let reqObj  =   {
            "username"  :   allParams.username
        }
        usersModel.find(reqObj)
        .then((userDetails)=>{
            console.log("userDetails ",userDetails)
            if(userDetails.length == 0){
                res.status(200).json({
                    status: false,
                    message: "User not found"
                });
            }else{
                return userDetails[0];
            }
        })
        .then(async(userDetails)=> {
            console.log("userDetails in ",userDetails)
            var userRegDate             =   userDetails.createdAt;
            var currentCollectionName   =   allParams.lastMonthTrans+"-transactions";
    //         var lastTransCompleted":true,
    // "lastTransCount":0
            if(allParams.currentpage == 0){
                currentCollectionName  =   (userRegDate.getMonth() >= 10 ? userRegDate.getMonth() +1 : "0"+(userRegDate.getMonth()+1)) + "-"+userRegDate.getFullYear()+"-transactions";
            }
            var currentTransactionModel =   mongoose.model(currentCollectionName, transactionModel.TransactionSchema);
            console.log("currentCollectionName",currentCollectionName);
            let transactions = await currentTransactionModel.find().skip(allParams.lastTransCount).limit(pageSize).exec();
            console.log("transactions ",transactions)
                if(transactions.length == 0){
                    res.status(200).json({
                        status: true,
                        message: "No further transactions to show.",
                        data:    [],
                        lastMonthTrans:currentCollectionName.split("-")[0]+"-"+currentCollectionName.split("-")[1],
                        lastTransCompleted:true,
                        lastTransCount:0
                    })
                }else{
                    var totalTransactons    =   await currentTransactionModel.find({}).countDocuments();
                    var lastTransCount      =   transactions.length+allParams.lastTransCount;
                    var lastTransCompleted  =   true;
                    if(totalTransactons > (transactions.length+allParams.lastTransCount)){
                        lastTransCompleted  =   false;
                    }
                    res.status(200).json({
                        status: true,
                        message: "transactions found",
                        data:    transactions,
                        totalTransactons:   totalTransactons,
                        lastTransCompleted: lastTransCompleted,
                        lastTransCount: lastTransCount,
                        lastMonthTrans:currentCollectionName.split("-")[0]+"-"+currentCollectionName.split("-")[1],
                    })
                }
            
            // res.status(200).json({
            //     status: true,
            //     message: "User found",
            //     data:    userDetails
            // })

            
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err,
                data:null
            });
        })
    })
    .catch((errMsg)=>{
        res.status(400).json({
            status: false,
            message: errMsg,
            data:null
        });
    })
}


module.exports = {
    getTransactionDetails//Get transaction details based on username and pagination
}