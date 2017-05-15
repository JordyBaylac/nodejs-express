

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
/**
 * Inicia el router referente a los books!
 * @param {object} expressApp
 * @param {[]} navigation
 * @param {object} mongodbUri
 */
function init(express, bookService, navigation) {

    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(bookService, navigation);

    //! especificando middleware para las rutas, checking roles.
    bookRouter.use(bookController.middleware);

    bookRouter.route('')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getBookById);

    return bookRouter;
}

module.exports = init;