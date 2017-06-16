var express = require('express');
var model 	= require('../model/activityModel');
var router = express.Router();

router.get('/', (req, res, next) => {
    model.getActivity(req.query.userID, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    })
});

router.post('/addProject', (req, res, next) => {
    model.addProject(req.body.userID, req.body.description, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    })
})

module.exports = router;