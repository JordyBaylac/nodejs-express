
var authController = function(authService) {

    var getSignUp = function(req, res) {

        authService.signUp(req.body.userName, req.body.password)
            .then(function(user) {
                req.login(user, function(err) {
                    res.redirect('/auth/profile');
                });
            })
            .catch(function(err) {
                console.log('error en signUp:');
                console.log(err);
                res.redirect('/');
            });

    };

    // sigIn is handled by passport
    var getSignIn = authService.signIn;

    return {
        getSignUp: getSignUp,
        getSignIn: getSignIn
        // getProfile: getProfile
    };
};

module.exports = authController;