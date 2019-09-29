<template>
    <div class="page_container">
        <div class="page_label">
            <label >Please select an option from below</label>
        </div>
         <div class="btn_container">
             <br/>
             <router-link class="btn" to="newtrans">Start New Transaction</router-link>
             <br/>
             <br/>
            <router-link class="btn" to="showtrans">Show Transaction History</router-link>
         </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
export default {
}

</script>

<style scoped>
.page_container {
    /* background-image: url('../images/e-wallet.png');
    background-position: center;
    background-repeat: no-repeat;
    filter: grayscale(100%); */
    height: inherit;
    font-size: x-large;
}

.btn_container {
    margin: 2px;
    display: inline;
}

.btn {
    margin: 2px;
}
</style>