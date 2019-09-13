let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.ObjectId;


let UsersSchema = new mongoose.Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    balance:{type:Number,required:true},
    mobile:{type:Number,required:true},
    createdBy: { type: ObjectID},//, ref: 'users' },
    updatedBy: { type: ObjectID}//, ref: 'users' },
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

let UsersModel = mongoose.model('users', UsersSchema);

module.exports  =   UsersModel;