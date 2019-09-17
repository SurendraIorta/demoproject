/**
 * @api {post} /transactions/savetransaction SaveTransaction
 * @apiName Save transaction
 * @apiGroup Save Transaction
 * 
 * 
 * @apiParam {String} sender    Sender's username 
 * @apiParam {String} receiver  Receiver's username
 * @apiParam {String} amount  	Amount of transaction
 * @apiParam {String} transactionType Transaction type("Cash" , "Cheque" , "Digital payment")
 * 
 *
 
 * @apiParamExample {json} Request-Example:
 *{
	"sender":"walletuser",
	"receiver":"receiveruser",
	"amount":"050",
	"transactionType":"Cash"
}

 *

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "status": true,
    "message": "Transaction Successful",
    "data": {
        "_id": "5d80e36190c9f004545a6c9d",
        "sender": "5d79f336b155b330864ad860",
        "receiver": "5d7a86c6b155b330864ae692",
        "amount": 50,
        "time": "2019-09-17T13:45:05.005Z",
        "status": "Success",
        "transactionType": "Cash",
        "createdBy": "5d79f336b155b330864ad860",
        "updatedBy": "5d79f336b155b330864ad860",
        "createdAt": "2019-09-17T13:45:05.012Z",
        "updatedAt": "2019-09-17T13:45:05.012Z"
    }
}
 *
 * @apiUse DataNotFoundError
 * @apiUse InternalServerError
 * @apiUse BadRequest
 * @apiUse AccessDeneid
 */