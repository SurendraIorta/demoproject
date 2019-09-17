let mongoose = require('mongoose');
var transactionModel    =   require('../sendmoney/model');
var usersModel          =   require('../../users/model');

let pageSize            =   10;
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
   
    console.log("req received",allParams,req.params);
    return new Promise((resolve,reject)=>{
            if(!allParams.username){
               reject("Username is mandatory.");
            }
            else if(!allParams.currentpage && allParams.currentpage != 0){
                reject("Current page number is mandatory.");
            }
            else if(!allParams.lastMonthTrans && allParams.currentpage != 0){
                reject("lastMonthTrans value is mandatory.");
            }
            else if(!allParams.lastTransCompleted && allParams.lastTransCompleted != false){
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
            var userRegDate             =   userDetails.createdAt;
            var currentCollectionName   =   allParams.lastMonthTrans+"-transactions";
            if(allParams.currentpage == 0){
                currentCollectionName  =   (userRegDate.getMonth() >= 10 ? userRegDate.getMonth() +1 : "0"+(userRegDate.getMonth()+1)) + "-"+userRegDate.getFullYear()+"-transactions";
            }
 
            let transactionData    =  await getTransactionHistory(currentCollectionName,allParams.lastTransCount);
            transactionCollData    =   [];
            if(transactionData.transactionData.length == 0){
                res.status(200).json({
                    status: true,
                    message: "No further transactions to show.",
                    data:    [],
                    lastMonthTrans:currentCollectionName.split("-")[0]+"-"+currentCollectionName.split("-")[1],
                    lastTransCompleted:true,
                    lastTransCount: transactionData.lastTransCount
                })
            }else{
                var totalTransactons    =   transactionData.totalTransactons;
                let transactions       =   transactionData.transactionData;
                let lastTransCount      =   transactionData.lastTransCount;
                let lastTransCompleted  =   transactionData.lastTransCompleted;

                res.status(200).json({
                    status: true,
                    message: "transactions found",
                    data:    transactions,
                    totalTransactons:   totalTransactons,
                    lastTransCompleted: lastTransCompleted,
                    lastTransCount: lastTransCount,
                    lastMonthTrans:transactionData.lastMonthTrans,
                })
            }
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
var transactionCollData =   [];
let getTransactionHistory = async (currentCollectionName,lastTransCount)=> {
    var currentTransactionModel =   mongoose.model(currentCollectionName, transactionModel.TransactionSchema);
    let transactions            =   await currentTransactionModel.find().skip(lastTransCount).limit(pageSize - transactionCollData.length).exec();
    var totalTransactons        =   await currentTransactionModel.find({}).countDocuments();
    var lastTransCount          =   transactions.length+lastTransCount;
    let lastTransCompleted      =   true;
    if(totalTransactons > lastTransCount){
        lastTransCompleted      =   false;
    }
    transactionCollData         =   transactionCollData.concat(transactions);
     
    //if trans data length == total and less than 10 change collection to next month
    let lastCollection      =   currentCollectionName.split("-");
    var today               =   new Date();
    if(transactionCollData.length < pageSize && today.getMonth()+1 != (Number(lastCollection[0])) && lastCollection[1] == today.getFullYear()){
        if(transactionCollData.length < pageSize && transactionCollData.length <= totalTransactons ){
            lastTransCount          =   0;
            if(Number(lastCollection[0]) == 11){
                //If its last month change month to 0 and year++
                lastCollection[0]   =   0;
                lastCollection[1]   =   Number(lastCollection[1]) + 1;
            }
            currentCollectionName   =   (Number(lastCollection[0]) >= 10 ? Number(lastCollection[0]) +1 : "0"+(Number(lastCollection[0])+1)) + "-" + lastCollection[1] + "-" + lastCollection[2];
               return getTransactionHistory(currentCollectionName,lastTransCount);
        }else{
            return getTransactionHistory(currentCollectionName,lastTransCount);
        }
    }else{
        let lastMonthTrans          =   currentCollectionName.split("-")[0]+"-"+currentCollectionName.split("-")[1];
        return {"transactionData":transactionCollData,"totalTransactons":totalTransactons,"lastTransCompleted":lastTransCompleted,"lastTransCount":lastTransCount,"lastMonthTrans":lastMonthTrans};
    }

}

module.exports = {
    getTransactionDetails//Get transaction details based on username and pagination
}