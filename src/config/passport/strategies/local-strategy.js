
module.exports = function(passport, mongodbUri) {

    var LocalStrategy = require('passport-local').Strategy;
    var mongodb = require('mongodb').MongoClient;

    passport.use(new LocalStrategy({
        usernameField: 'userName',
        password: 'password'
    }, function verify(username, password, done) {

        mongodb.connect(mongodbUri, function(err, db) {

                var users = db.collection('users');
                users.findOne({username: username}, function(err, result) {
                        if (result.password === password) {
                            done(null, result);
                        }
                        else {
                            console.log('password \'' + password + '\' is not the correct one');
                            done(null, false);
                        }
                        db.close();
                    });
            });

    }));
};