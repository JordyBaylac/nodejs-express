

var bookService = function(mongodbUri) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;

    var getBooks = function() {
        return new Promise(function(resolve, reject) {
            mongodb.connect(mongodbUri, function(err, db) {
                if (err) {
                    reject(err);
                    db.close();
                    return;
                }
                var collection = db.collection('books');
                collection.find({}).toArray(function(err, results) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(results);
                    }
                    db.close();
                });
            });
        });
    };

    var getBookById = function(id) {
        return new Promise(function(resolve, reject) {
            mongodb.connect(mongodbUri, function(err, db) {
                if (err || db == null) {
                    reject(err);
                }
                var collection = db.collection('books');
                collection.findOne({_id: objectId(id)}, function(err, thebook) {
                    if (err || thebook == null) {
                        reject(err);
                    }
                    resolve(thebook);
                    db.close();
                });
            });
        });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById
    };

};

module.exports = bookService;