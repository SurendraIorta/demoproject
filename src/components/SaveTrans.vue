<template>
    <div>
        <h1 >New Transaction</h1>
        <div class="trans_form" id="trans_form">
            <div class="row">
                <div class="col1">
                    <label for="username" class="label">Username : </label>
                </div>
                <div class="col2">
                    <input type="text" v-model="transaction.username"/>
                </div>
            </div>
            <div class="row">
                <div class="col1">
                    <label for="receiver" class="label">Receiver : </label>
                </div>
                <div class="col2">
                    <input type="text" v-model="transaction.receiver"/>
                </div>
            </div>
            <loading :active.sync="visible" :can-cancel="true"></loading>
            <div class="row">
                <div class="col1">
                    <label for="amount" class="label">Amount : </label>
                </div>
                <div class="col2">
                    <input type="number" v-model="transaction.amount"/>
                </div>
            </div>
            <div class="row">
                <div class="col1">
                    <label for="transtype" class="label">Transaction Type : </label>
                </div>
                <div class="col2">
                    <select v-model="transaction.transactionType" class="transselectbox">
                        <option v-for="type in transactionTypeOptions" v-bind:key="type">{{ type }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <button class="submitbtn" @click="saveTransaction">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Toasted from 'vue-toasted';

Vue.use(VueResource);
Vue.use(VueLoading);
Vue.use(Toasted);

// Lets Register a Global Error Notification Toast.
Vue.toasted.register('trans_success', (msg) => {
        if(!msg){
            return 'Transaction Successful.';
        }
        return 'Transaction Successful. ' + msg;
}, {
    type : 'success',
    duration : 2000,
    position :  'bottom-center'
})

Vue.toasted.register('trans_failed', (msg) => {
        if(!msg){
            return "Connection issue, remote server not reachable.";
        }
        return msg;
}, {
    type : 'error',
    duration : 2000,
    position :  'bottom-center'
})

export default {
    data    :   function() {
       return {
           transaction : {
            username         :   "walletuser",
            receiver         :   "receiveruser",
            amount           :   0,
            transactionType  :   "Cheque"
           },
           transactionTypeOptions   :   ["Cash" , "Cheque" , "Digital payment"],
           visible: false
       }
    },
    methods :   {
        saveTransaction :   function(){
            /**
             * ToDo: Validation
             */
            this.visible = true;
            let url =   "http://localhost:5001/transactions/savetransaction";
            this.transaction.sender = this.transaction.username;
            this.$http.post(url,this.transaction)
            .then((response) => {
                 this.visible               =   false;
                 this.transaction.amount    =   0;
                console.log(response);
                this.$toasted.global.trans_success(response.data.data);
                // alert(JSON.parse(response.bodyText).message);
            },(error)=>{
                 this.visible = false;
                console.log(error);
                let message =   "Connection issue, remote server not reachable.";
                if(error.data.message){
                    message =   error.data.message;
                }
                this.$toasted.global.trans_failed(message);
            })
        }
    },
    components: {
        Loading: VueLoading
    },
}
</script>

<style scoped>
html {
        background-color: gainsboro;
}
.trans_form  {
    border: 2px solid black;
    width: 50%;
    align-content: center;
    vertical-align: middle;
    margin-left: 25%;
    padding: 15px;
    background-color: gainsboro;
}
.row {
    width: 50%;
    display: inline-block;
    margin: 10px;
}
.col1 {
    display: inline-block;
    text-align: left;
    width: 49%;
}
.col2 {
    display: inline-block;
     width: 49%;
}
.submitbtn {
    width: 50%;
    border-radius: 5%;
    background-color: #a1acce;
}
.transselectbox {
    width: 100%;
}
.label {
    color: black;
}
</style>