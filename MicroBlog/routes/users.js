var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { //产生控制权转移,如果捕获规则相同,则前一个函数处理完毕后,通过调用next方法,讲控制权转移给下一个,可以实现中间件(目前还不知道中间件是什么)
  res.send('respond with a resource');
});

router.get('/:user', function(req, res, next) { //正则表达式,在相应函数中可以采用 req.params 访问
    res.send('user is ' + req.params.user);
});

module.exports = router;
