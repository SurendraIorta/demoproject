let express =   require('express');
let router  =   express.Router();

var controller  =   require('./controller');
router.post('/gettransaction',controller.getTransactionDetails);


module.exports = router;