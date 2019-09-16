let mongoose = require('mongoose');

var usersModel          =   require('../../users/model');

/**
 * Surendra Waso - 12/09/2019
 * Save the transaction details
 * req:{
	"username":"walletuser",
    "currentpage":2,
    "lastMonthTrans":02-2019,
    "lastTransCompleted":true
	
}
 */
let getTransactionDetails     =   (req,res)=>{

    let allParams       =   req.body;
    console.log("req received",allParams,req.params);
    return new Promise((resolve,reject)=>{
            if(!allParams.username){
               reject("Username is mandatory.");
            }
            else if(!allParams.currentpage){
                reject("Currentpage number is mandatory.");
            }
            else if(!allParams.lastMonthTrans){
                reject("lastMonthTrans value is mandatory.");
            }
            else if(!allParams.transactionType){
                reject("Transaction type value is mandatory.");
            }else if(!allParams.lastTransCompleted){
                reject("lastTransCompleted value is not valid.");
            }else{
                resolve(null);
            }
    })
}


module.exports = {
    getTransactionDetails//Get transaction details based on username and pagination
}