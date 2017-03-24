var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;
//var spawn = require('child_process').spawn;
var path = require('path');
/* GET home page. */
var login_status = 0;
var getusername = function () {
    var retVal;
    if(login_status == 1) {
        retVal = 'wangmeng'
    }
    else {
        retVal = 'Please Log In ...';
    }

    return retVal;
};

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard', {LoginStatus: getusername()});
});

router.get('/controlpanel', function (req, res, next) {
    res.render('index', {title: 'Control Panel', LoginStatus: getusername()});
});

router.get('/test', function (req, res, next) {
    res.render('layout',{LoginStatus: getusername()});
});

router.get('/detail', function (req, res, next) {
    res.render('detail', {LoginStatus: getusername()});
});


router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/info', function (req, res, next) {
    var this_username = req.body.username;
    var this_password = req.body.password;

    if( this_username == 'wangmeng' &&
        this_password == 'ecnusist') {
        login_status = 1;
        res.render('dashboard', {LoginStatus: getusername()});
    }
    else
        res.redirect('/');
});


router.post('/cmd', function (req, res, next) {
    var dataFromFront = JSON.parse(req.body.data);
    console.log(dataFromFront.sensor);
    console.log(dataFromFront.number);
    console.log(dataFromFront.command);

    var dataToFront = {
        finalstatus: 'Yes'
    };
    cmdline = __dirname + '/../public/script/test.sh';
    console.log(cmdline);
    exec(cmdline, [dataFromFront.sensor,dataFromFront.number, dataFromFront.command], function () {
        //promise waiting for call back
        res.json(dataToFront);
    });
});


module.exports = router;
