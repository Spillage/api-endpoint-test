###########How to start api endpoint
1. git clone $current_repo
    
2. npm run start

3. curl -XPOST -H'content-type: application/json' http://localhost:30001/bank -d'{"payment_method":"SWIFT","bank_country_code":"US","account_name":"John Smith","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"}'

###########How to start mocha for unittest
1. mocha test/bank.test.js 
PS, please update test/testdata/json when test with different url.


###########Questions in business requirement and something else
1. Account_name, account_number should require special charactor check.
2. Error messages given didnot cover the exceptional scenatios totally.
3. One message got conflict:
account_number length error: "Length of account_number should be between 7 and 11 when bank_country_code is 'US'"
conflict with requirement#4
account number: mandatory
for US, account number is 1-17 character long, can be any character
Please clearify the requirements.