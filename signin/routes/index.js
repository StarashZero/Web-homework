var express = require('express');
var router = express.Router();
var validator = require("../public/javascripts/validator");
var debug = require('debug')('signin:index');


module.exports = function(db){
    /* GET home page. */
    var userManager = require('../models/user')(db);
    router.get('/signup', function (req, res, next) {
        res.render('signup', {title: '注册', user: {}});
    });
    router.post('/signup', function (req, res, next) {
        var user = req.body;
        userManager.checkUser(user).then(userManager.createUser)
            .catch(function (reason) {
                res.render('signup',{title: '注册', user:user,error:reason.message})
                    .then(function () {
                req.session.user = user;
                return res.redirect('/detail');
             });
        });
/*        try{
            checkUser(user);
            req.session.user = user;
            res.redirect('/detail');
        } catch (e) {
            res.render('signup', {title: '注册', user: user,error:e.message});
        }*/

    });


    router.get('/signout', function (req, res, next) {
        delete req.session.user;
        return res.redirect('/signin');
    });
    router.get('/signin', function (req, res, next) {
        res.render('signin', {title: '登录', user: {}});
    });

    router.post('/signin', function (req, res, next) {
        userManager.findUser(req.body.username,req.body.password).catch(function (reason) {
            res.render('signin',{title: '登录',user:req.body, error:"用户名密码错误"});
        }).then(function (data) {
            if(data[0]) {
                req.session.user = data[1];
                return res.redirect('/detail');
            }else
                res.render('signin',{title: '登录',user:req.body, error:"用户名密码错误"});
        });
    });

    router.all('*', function (req, res, next) {
       if(req.session.user)
           next();
       else
           res.redirect('/signin');
    });

    router.get('/detail', function (req, res, next) {
        res.render('detail', {title: '详情',user: req.session.user});
    });


    return router;
};



