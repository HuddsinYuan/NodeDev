var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('layout', { title:'Jonassen' }); //调用模板解析引擎
});

router.post('/post', function (req, res, next) {

});

router.get('/reg', function (req, res, next) {

});

router.post('/reg', function (reg, res, next) {

});

router.get('/login', function (reg, res, next) {

});

router.post('/login', function (reg, res, next) {

});

router.get('/logout', function (reg, res, next) {

});


module.exports = router;
