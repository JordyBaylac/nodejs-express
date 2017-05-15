

var mongodb = require('mongodb').MongoClient;

/**
 * Inicia el router referente a los books!
 * @param {object} express
 */
function init(express, mongodbUri) {

    var adminRouter = express.Router();
    var theBooks = require('./../../booksData');

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            mongodb.connect(mongodbUri, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(theBooks, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
}

module.exports = init;