var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;
//var spawn = require('child_process').spawn;
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/cmd', function (req, res, next) {
    var dataFromFront = JSON.parse(req.body.data);
    console.log(dataFromFront.sensor);
    console.log(dataFromFront.command);

    var dataToFront = {
        finalstatus: 'Yes'
    };
    exec(__dirname + '/../public/script/test.sh', function () {
        //promise waiting for call back
        res.json(dataToFront);
    });
});


module.exports = router;
