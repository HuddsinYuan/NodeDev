var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;
//var spawn = require('child_process').spawn;
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('dashboard');
});

router.get('/controlpanel', function (req, res, next) {
    res.render('index', {title: 'Control Panel'});
});

router.get('/test', function (req, res, next) {
    res.render('layout');
});

router.get('/test', function (req, res, next) {
    res.render('layout');
});

router.get('/detail', function (req, res, next) {
    res.render('detail');
});


router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/cmd', function (req, res, next) {
    var dataFromFront = JSON.parse(req.body.data);
    console.log(dataFromFront.sensor);
    console.log(dataFromFront.command);

    var dataToFront = {
        finalstatus: 'Yes'
    };
    cmdline = __dirname + '/../public/script/test.sh';
    console.log(cmdline);
    exec(cmdline, [dataFromFront.sensor, dataFromFront.command], function () {
        //promise waiting for call back
        res.json(dataToFront);
    });
});


module.exports = router;
