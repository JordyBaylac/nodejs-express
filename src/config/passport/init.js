


function configure(expressApp, mongodbUri) {

    var passport = require('passport');
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());

    passport.serializeUser(function(user, done) {
        // done(null, user.id);
        done(null, user);
    });

    passport.deserializeUser(function(userId, done) {
        // var user = userFromId(userId);
        var user = userId;
        done(null, user);
    });

    require('./strategies/local-strategy')(passport, mongodbUri);

}

module.exports = configure;