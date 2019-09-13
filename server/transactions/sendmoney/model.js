let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.ObjectId;

let statusOptions       =   ["Success","Failed","Pending"];
let transactionTypes    =   [ "Cash" , "Cheque" , "Digital payment"];

let transactionCollection   =   {
    sender: {type:ObjectID,required:true,ref:'users'},
    receiver: {type:ObjectID,required:true,ref:'users'},
    amount:{type:Number,required:true},
    time:{type:Date,required:true},
    status:{type:String,enum:statusOptions,required:true},
    transactionType:{type:String,enum:transactionTypes,required:true},
    createdBy: { type: ObjectID, ref: 'users' },
    updatedBy: { type: ObjectID, ref: 'users' },
};

var collectionArguments = {
    timestamps: true,
    versionKey: false,
    strict: false
}

let TransactionSchema = new mongoose.Schema(transactionCollection,collectionArguments);

let TransactionModel = mongoose.model('transactions', TransactionSchema);

module.exports  =   {
    TransactionModel,
    TransactionSchema,
    collectionArguments
};