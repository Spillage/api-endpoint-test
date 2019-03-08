var express = require('express');
var router = express.Router();

const bank_country_code = ['US','CN','AU'];
const errmsg = new Map([
    ['acc_num_not_gvn','account number is required'],
    ['acc_num_len_us','Length of account_number should be between 7 and 11 when bank_country_code is "US"'],
    ['invalid_swiftcode_len','Length of swift_code should be either 8 or 11'],
    ['invalid_swiftcode','The swift code is not valid for the given bank country code: US'],
    ['default_err','incorrect params!']    
]);

router.post('/', function(req, res, next) {
    var params = req.body;
    console.log(params);
    if(params.payment_method === 'SWIFT'){
        if(!validswift(params.swift_code)){
            res.status(400).json({
                "failure":errmsg.get('invalid_swiftcode')
            });
            return            
        }
    }else if(params.payment_method === 'LOCAL'){
    }else{
        res.status(400).json({
            "failure":errmsg.get('default_err')
        });
        return;
    }

    if(params.account_number == null || !validaccount(params.account_number,params.bank_country_code)){
        res.status(400).json({
            "failure":errmsg.get('acc_num_not_gvn')
        })  
        return;      
    }

    if(params.account_name == null || !validname(params.account_name)){
        res.status(400).json({
            "failure":errmsg.get('default_err')
        })  
        return;      
    }

    if(params.bank_country_code === 'AU'){
        if(!validbsb(params.bsb)){
            res.status(400).json({
                "failure":errmsg.get('default_err')
            });  
            return;           
        }
    } else if(params.bank_country_code === 'US') {
        if(!validaba(params.aba)){
            res.status(400).json({
                "failure":errmsg.get('default_err')
            }); 
            return;            
        }
    }

    res.status(200).json({
        "success": "Bank details saved"
    })
    return;
});

function validswift(swiftcode){
    console.log(swiftcode.substring(4,6));
    if((swiftcode.length==8 || swiftcode.length==11) && (bank_country_code.indexOf(swiftcode.substring(4,6))>-1)){
        return true;
    }else {
        return false;
    }   
}

function validaccount(accountnum,country){
    var flag = false;
    console.log(accountnum,country);
    switch(country){
        case 'AU':
            if(accountnum.length >= 6 && accountnum.length <= 9){
                flag = true;
            }
            break;
        case 'US':
            if(accountnum.length >= 1 && accountnum.length <= 17){
                flag = true;
            }
            break;
        case 'CN':
            if(accountnum.length >= 8 && accountnum.length <= 20){
                flag = true;
            }
            break;
        default:
            break;
    }
    return flag;
}

function validname(accountname){
    console.log(accountname);
    var flag = false;
    if(accountname.length >= 2 && accountname.length <= 10){
        flag = true;
    }
    return flag;
}

function validbsb(bsb){
    console.log(bsb);
    var flag = false;
    if(bsb.length == 6){
        flag = true;
    }
    return flag;
}

function validaba(aba){
    console.log(aba);
    var flag = false;
    if(aba.length == 9){
        flag = true;
    }
    return flag;
}


module.exports = router;