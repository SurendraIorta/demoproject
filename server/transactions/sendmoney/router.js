let express =   require('express');
let router  =   express.Router();

var controller  =   require('./controller');
router.post('/savetransaction',controller.saveTransaction);
router.post('/testcode',controller.testCode);

module.exports = router;