

var bookController = function(bookService, navigation) {

    /**
     * Check roles and auth permissions for Book Controller.
     * @param {*} req Request coming form the user.
     * @param {*} res Response used when there is a redirection or a error message.
     * @param {*} next Continue to the next request.
     */
    var middleware = function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            next();
        }
    };

    var getIndex = function(req, res) {
        console.log('<<getting books>>');
        bookService.getBooks()
            .then(function(result) {
                res.render('books-list', {
                    title: 'list of books!',
                    nav: navigation,
                    books: result
                });
            })
            .catch(function(err) {
                console.log('Hay un error: ', err);
            });
    };

    var goodReadsService = require('../services/book/bookService.goodreads')();

    var getBookById = function(req, res) {
        console.log('  <<getting a book>>');
        var id = req.params.id;
        bookService.getBookById(id)
            .then(function(thebook) { // book from mongodb
                console.log('....book from book service is here');
                return goodReadsService.getBookById(thebook.bookId);
            },function(err) {
                console.log('No existe el id en la db');
                res.send('no existe el book con ese id en la db');
            })
            .then(function(book) { // book from goodreads API
                console.log('....book from goodreads API is here');
                res.render('book-single', {
                    title: 'Info of ' + book.title,
                    nav: navigation,
                    book: book
                });
            }, function(err) {
                console.log('No hay informacion disponible en goodreads');
                res.send('No hay informacion disponible en goodreads');
            })
            .catch(function(err) {
                console.log('Hay un error inesperado: ', err);
                res.sendStatus(404);
            });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getBookById: getBookById
    };

};

module.exports = bookController;