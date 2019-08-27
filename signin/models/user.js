var bcrypt = require('bcryptjs');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var _ = require('lodash');
module.exports = function (db) {
    var users = db.collection('user');
    return{
        findUser:function (username, password) {
            return users.findOne({username:username}).then(function (user) {
                return user? bcrypt.compare(password,user.password).then(function (isMatch) {
                    var r = [isMatch,user];
                    return r;
                }):Promise.reject("user doesn't exit");
            });
        },
        createUser:function (user) {
            var iteration = 10;
            return bcrypt.hash(user.password,iteration).then(function (value) {
                user.password = value;
                return users.insert(user);
            });
        },
        checkUser: function (user) {
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function (reslove,reject) {
                formatErrors ? reject(formatErrors):reslove(user);
            }).then(function () {
                return users.findOne(getQueryForUniqueInAttribute(user)).then(function (value) {
                    debug("existed user: ",value);
                    return value? Promise.reject("user isn't unique"):Promise.resolve(user);
                });
            });
        }
    };
};

function getQueryForUniqueInAttribute(user) {
    var z = [];
    for(var key in user){
        var r = {};
        if(key!=='password'&&key!=='repeat_password'){
            r[key] = user[key];
            z[z.length] = r;
        }

    }
    return{
        $or: z
    }
}

