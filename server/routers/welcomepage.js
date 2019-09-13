let welcomeToWallet =   (req,res)=>{
    res.status(200).json({
        "status" : true,
        "message" : "Welcome to IortaWallet.",
        "result" : "Welcome to IortaWallet result."
    })
}

module.exports = welcomeToWallet;