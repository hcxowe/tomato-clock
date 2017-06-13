var express = require('express');
var model 	= require('../model/usersModel');
var router = express.Router();

router.get('/', (req, res, next) => {
	if (!req.session.userName) {
        res.json({
			'ret': 404,
			'msg': '用户未登录'
		});
    } 
    else {
        res.json({
			'ret': 200,
			'msg': '用户已登录'
		});
    }
});

router.post('/login', (req, res, next) => {
	res.json({
		'ret': 200,
		'msg': '验证成功'
	});
});

router.post('/signin', (req, res, next) => {
	model.signin(req.body.userName, req.body.email, req.body.passWD, (err, user) => {
		if (err) {
			res.json(err);
		}
		else {
			res.json({ 'code': 0, 'msg': 'success'});
		}
	});
});

module.exports = router;
