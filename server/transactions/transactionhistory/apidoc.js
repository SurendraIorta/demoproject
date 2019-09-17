/**
 * @api {post} /transactions/savetransaction SaveTransaction
 * @apiName Save transaction
 * @apiGroup Save Transaction
 * 
 * 
 * @apiParam {String} username    Username of logged-in user
 * @apiParam {String} currentpage  Current page number
 * @apiParam {String} lastMonthTrans Last month of transaction
 * @apiParam {String} lastTransCompleted Transaction list completed or not(true,false)
 * @apiParam {String} lastTransCount Last transaction list count received
 *
 
 * @apiParamExample {json} Request-Example:
 *{
	"username":"walletuser",
    "currentpage":0,
    "lastMonthTrans":"",
    "lastTransCompleted":false,
    "lastTransCount":0
}

 *

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "status": true,
    "message": "transactions found",
    "data": [
        {
            "_id": "5d80adf856bd730141b3c00d",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 50,
            "time": "2019-07-13T05:47:08.063Z",
            "status": "Failed",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-07-13T05:47:08.073Z",
            "updatedAt": "2019-07-13T05:47:08.073Z"
        },
        {
            "_id": "5d80ae0256bd730141b3c01c",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 50,
            "time": "2019-07-13T05:47:08.063Z",
            "status": "Failed",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-07-13T05:47:08.073Z",
            "updatedAt": "2019-07-13T05:47:08.073Z"
        },
        {
            "_id": "5d7afab6c45ea429b845f41c",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1234,
            "time": "2019-09-13T02:11:02.333Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:11:02.343Z",
            "updatedAt": "2019-09-13T02:11:02.343Z"
        },
        {
            "_id": "5d7aff0f7f7def1c3cb42158",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1000,
            "time": "2019-09-13T02:29:35.448Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:29:35.459Z",
            "updatedAt": "2019-09-13T02:29:35.459Z"
        },
        {
            "_id": "5d7aff22b614ee10acc71122",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1000,
            "time": "2019-09-13T02:29:54.727Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:29:54.735Z",
            "updatedAt": "2019-09-13T02:29:54.735Z"
        },
        {
            "_id": "5d7b00698d73622a346715a4",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1000,
            "time": "2019-09-13T02:35:21.270Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:35:21.278Z",
            "updatedAt": "2019-09-13T02:35:21.278Z"
        },
        {
            "_id": "5d7b00f2c693152a6c9377d5",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1000,
            "time": "2019-09-13T02:37:38.409Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:37:38.417Z",
            "updatedAt": "2019-09-13T02:37:38.417Z"
        },
        {
            "_id": "5d7b012c6d97d8006886509e",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 1000,
            "time": "2019-09-13T02:38:36.382Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:38:36.392Z",
            "updatedAt": "2019-09-13T02:38:36.392Z"
        },
        {
            "_id": "5d7b016c3d39260f302fe697",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 5,
            "time": "2019-09-13T02:39:40.981Z",
            "status": "Pending",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T02:39:40.992Z",
            "updatedAt": "2019-09-13T02:39:40.992Z"
        },
        {
            "_id": "5d7b26b961ea89061479494d",
            "sender": "5d79f336b155b330864ad860",
            "receiver": "5d7a86c6b155b330864ae692",
            "amount": 50,
            "time": "2019-09-13T05:18:49.343Z",
            "status": "Failed",
            "transactionType": "Cash",
            "createdBy": "5d79f336b155b330864ad860",
            "updatedBy": "5d79f336b155b330864ad860",
            "createdAt": "2019-09-13T05:18:49.345Z",
            "updatedAt": "2019-09-13T05:18:49.345Z"
        }
    ],
    "totalTransactons": 11,
    "lastTransCompleted": false,
    "lastTransCount": 8,
    "lastMonthTrans": "08-2019"
}
 *
 * @apiUse DataNotFoundError
 * @apiUse InternalServerError
 * @apiUse BadRequest
 * @apiUse AccessDeneid
 */