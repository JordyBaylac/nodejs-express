
var authService = function(mongodbUri) {

    var mongodb = require('mongodb').MongoClient;
    var passport = require('passport');

    var signUp = function(username, password) {

        return new Promise(function(resolve, reject) {

            mongodb.connect(mongodbUri, function(err, db) {

                var users = db.collection('users');

                users.findOne({username: username}, function(err, user) { //el resultset es el user
                    if (err || user == null) {
                        reject(err);
                        return;
                    }
                    if (user === null) {
                        console.log('el usuario NO existia, creandolo!');
                        var newuser = {
                            username: username,
                            password: password
                        };
                        users.insertOne(newuser, function(err, result) { //el result set es un objeto de mongodb
                            if (err || result == null) {
                                reject(err);
                            }
                            else {
                                resolve(newuser);
                            }
                            db.close();
                        });
                    }
                    else {
                        console.log('el usuario existia, verificando password!');
                        if (user.password === password) {
                            console.log('credenciales validas, logeando');
                            resolve(user);
                        }
                        else {
                            console.log('bad password');
                            reject('user exist, please choose another username');
                        }
                        db.close();
                    }

                });
            });
        });

    };

    var signIn = (function(req, res) {

        return passport.authenticate('local', {
            failureRedirect: '/',
            successRedirect: '/auth/profile'
        });

    })(null, null);

    return {
        signUp: signUp,
        signIn: signIn
    };

};

module.exports = authService;