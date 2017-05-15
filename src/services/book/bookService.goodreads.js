

var bookService = function() {

    var http = require('http');
    var xml2json = require('xml2js');
    var parser = xml2json.Parser({explicitArray: false});
    var apiKey = 'mN1DyVoFS4cfbCMh5HmnpA';

    var getBooks = function() {
        return new Promise(function(resolve, reject) {
            
        });
    };

    var getBookById = function(id) {
        return new Promise(function(resolve, reject) {

                http.request({
                    host: 'www.goodreads.com',
                    path: '/book/show/' + id + '?format=xml&key=' + apiKey
                }, function(stream) {

                    var str = '';
                    stream.on('data', function(chunk) {
                        str += chunk;
                    });
                    stream.on('end', function() {
                        parser.parseString(str, function(err, response) {
                            if (err || response == null || response.GoodreadsResponse == null) {
                                reject(err);
                            }
                            else {
                                resolve(response.GoodreadsResponse.book);
                            }
                        });
                    });

                }).on('error', function(err) {
                    console.log('error en goodreads api, requesto not done');
                    reject(err);
                }).end();

            });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById
    };

};

module.exports = bookService;