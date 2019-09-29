<template>
    <div class="page_container">
        <h1> Transactions History</h1>
        <div class="list_container">
            <ul style="list-style: none;">
                <div v-infinite-scroll="getTransList" infinite-scroll-disabled="isScrollBusy">
                    <li v-for="trans in transListData.transactions" v-bind:key="trans._id">
                        <div class="cardview">
                            <div class="leftcol">
                                <div class="row">
                                    <!--span class="translabel">Transaction ID - </span-->
                                    <span class="receivername"> {{firstCapital(trans.receiver.username)}}</span>
                                    <span class="transid"> {{trans._id}}</span>
                                </div>
                                <div class="row">
                                    <span> Type - {{trans.transactionType}}</span>
                                </div>
                                <div class="row">
                                    <span> Time - {{ new Date(trans.time).toLocaleString("en-IN")}}</span>
                                </div>
                            </div>
                            <div class="rightcol">
                                <div class="rigthrow">
                                    <span class="amountvalue"> {{trans.amount}}</span>
                                </div>
                                <div class="rigthrow">
                                    <span v-bind:class="[{failedtrans : (trans.status == 'Failed')},{successtrans : (trans.status != 'Failed')}]"> {{trans.status}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
                <div class="dataendlabel cardview" v-if="hasDataEnded">  <p> All transactions done. </p> </div>
            </ul>
        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

export default {
    data : function() {
        return {
            transListData : {
                    username            :    "walletuser",
                    currentpage         :    0,
                    lastMonthTrans      :    "",
                    lastTransCompleted  :   false,
                    lastTransCount      :   0,
                    transactions           :   []
            },
            hasDataEnded    :   false,
            isScrollBusy    :   false
        }
    },
    methods : {
        getTransList        :   function(){
            if(this.hasDataEnded){
                console.log("Test");
                this.isScrollBusy = true;
                return;
            }
             this.isScrollBusy = true;
            let transData   =   {
                "username"          :   this.transListData.username,
                "currentpage"       :   this.transListData.currentpage,
                "lastMonthTrans"    :   this.transListData.lastMonthTrans,
                "lastTransCompleted":   this.transListData.lastTransCompleted,
                "lastTransCount"    :   this.transListData.lastTransCount
            };
            let url =   "http://localhost:5001/transactionhistory/gettransaction";
            this.$http.post(url,transData)
            .then((response) => {
                console.log(response)
                let data            =   response.data.data
                this.transListData.currentpage++;
                this.transListData.lastMonthTrans       =   data.lastMonthTrans;
                this.transListData.lastTransCompleted   =   data.lastTransCompleted;
                this.transListData.lastTransCount       =   data.lastTransCount;
                if(data.transactions.length > 0){
                    this.transListData.transactions     =   this.transListData.transactions.concat(data.transactions);
                }else{
                    this.hasDataEnded                   =   true;
                }
                this.isScrollBusy = false;
            },(error) => {
                console.log(error);
                let message =   "Connection issue, remote server not reachable.";
                if(error.data.message){
                    message =   error.data.message;
                }
                alert(message)
            })
        },
        firstCapital  :   function(val) {
            return val[0].toUpperCase() + val.slice(1,val.length);
        }
    },
    created :   function(){
        // this.getTransList();
    }
}
</script>

<style scoped>
.list_container {
    margin-left: 20%;
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden; 
}
.cardview {
    border: 2px solid black;
    margin: 10px;
    list-style: none;
    background-color: #FF9B73;
    width: 75%;
}
.row {
    padding: 5px;
    text-align: left;
}
.leftcol {
    width: 60%;
    display: inline-block;
}
.rightcol {
    width: 30%;
    display: inline-block;
    height: inherit;
}
.receivername {
    text-align: left;
    margin-right: 20px;
    font-size: x-large;
    color: #235B79;
}
.transid {
    color: #086CA2;
    font-size: larger;
}
.amountvalue {
    font-size: xx-large;
    font-size: -webkit-xxx-large;
}
.failedtrans {
    font-size: large;
    color: red;
}
.rigthrow {
    margin: 5px;
}
.successtrans {
    font-size: large;
    color: green;
}
.dataendlabel {
    font-size: xx-large;
}
</style>
