var expect = require('chai').expect;
var axios = require('axios');

describe('/bank endpoint test', function() {
  it('check payment_method for LOCAL', function(done) {
    axios.post('http://localhost:30001/bank', {
      "payment_method":"LOCAL","bank_country_code":"US","account_name":"John Smith","account_number":"123","aba":"11122233A"
    })
    .then(function (response) {
      expect(response.statusCode, 200);
      done();
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  it('check payment_method for SWIFT', function(done) {
      axios.post('http://localhost:30001/bank', {
        "payment_method":"SWIFT","bank_country_code":"US","account_name":"John Smith","account_number":"123","aba":"11122233A"
      })
      .then(function (response) {
        expect(response.statusCode, 200);
        done();
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  it('unknown payment_method', function(done) {
      axios.post('http://localhost:30001/bank', {
        "payment_method":"XXXXX","bank_country_code":"US","account_name":"John Smith","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"
      })
      .then(function (response) {

      })
      .catch(function (error) {
        expect(error.response.statusCode, 400);
        done();
      });
  });


  it('check unknown country', function(done) {      
      axios.post('http://localhost:30001/bank', {
        "payment_method":"XXXXX","bank_country_code":"ZZ","account_name":"John Smith","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"
      })
      .then(function (response) {
      })
      .catch(function (error) {
        expect(error.response.statusCode, 400);
        done();
      });
  });

  it('check country for US', function(done) {
      axios.post('http://localhost:30001/bank', {
        "payment_method":"LOCAL","bank_country_code":"AU","account_name":"Pokeman Smith","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"
      })
      .then(function (response) {
      })
      .catch(function (error) {
        expect(error.response.statusCode, 400);
        done();
      });
  });

  it('check country for AU', function(done) {
      axios.post('http://localhost:30001/bank', {
        "payment_method":"LOCAL","bank_country_code":"AU","account_name":"Pokeman Smith Picachu picapicapicapica","account_number":"123","swift_code":"ICBCUSBJ","aba":"11122233A"
      })
      .then(function (response) {
      })
      .catch(function (error) {
        expect(error.response.statusCode, 400);
        done();
      });
  });
});