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
});

router.post('/addTask', (req, res, next) => {
    model.addTask(req.body.userID, req.body.projectID, req.body.description, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    });
});

router.post('/excuteTask', (req, res, next) => {
    model.operateTask(req.body.userID, req.body.projectID, req.body.taskID, 1, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    });
});

router.post('/backoutTask', (req, res, next) => {
    model.operateTask(req.body.userID, req.body.projectID, req.body.taskID, 0, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    });
});

router.post('/finishTask', (req, res, next) => {
    model.operateTask(req.body.userID, req.body.projectID, req.body.taskID, 2, (err, ret) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ret);
        }
    });
});

module.exports = router;