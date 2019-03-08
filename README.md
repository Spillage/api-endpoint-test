###########How to start api endpoint
1. git clone $current_repo
    
2. npm run start

3. curl -XPOST -H'content-type: application/json' http://localhost:30001/bank -d'{"payment_method":"SWIFT","bank_country_code":"US","account_name":"John Smith","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"}'

###########How to start mocha for unittest
1. mocha test/bank.test.js 
