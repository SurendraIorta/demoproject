var express =   require('express');
var router  =   express.Router();

var welcomePage =   require('./welcomepage');
var savetransactionRouter   =   require('../transactions/sendmoney/router');
// router.use('/',welcomePage)
router.use('/transactions',require('../transactions/sendmoney/router'));

module.exports = router;