/**
 * 
 * @param {Express} express 
 */
function init(express, authService, mongodbUri) {

    var authRouter = express.Router();
    var mongodb = require('mongodb').MongoClient;
    var passport = require('passport');
    var authController = require('../controllers/authController')(authService);

    authRouter.route('/signUp')
        .post(authController.getSignUp);

    authRouter.route('/signIn')
        .post(authController.getSignIn);

    // authRouter.route('/signIn')
    //     .post(passport.authenticate('local', {
    //         failureRedirect: '/'
    //     }), function (req, res) { //ok function
    //         res.redirect('/auth/profile');
    //     });

    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.isAuthenticated()) {
                console.log('user is not authenticated, so, /profile routhe is not accesible');
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            console.log('on profile');
            res.json(req.user);
        });

    return authRouter;
}

module.exports = init;