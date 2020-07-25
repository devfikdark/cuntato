let catchAsync = require('./../utils/catchAsync');
let dataModel = require('../model/dataModel');
let projectModel = require('../model/projectModel');
let authModel = require('./../model/authModel');

exports.getFromData = catchAsync(async(req, res, next) => {
  let projectToken = req.body.projectID;
  let getData = await dataModel.find({ _project: projectToken });
  if (getData.length > 0) {
    return res.status(200).json({
      status: "ok",
      getData
    });
  }
  res.status(200).json({
    status: "ok",
    message: "Nothing found here!!!"
  });
});

exports.postFromData = catchAsync(async(req, res, next) => {
  let data = req.body.data;
  let projectToken = req.body.token
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let domainURL = await projectModel.find({ _project: projectToken });
    domainURL = domainURL._userdomain;
  if (fullUrl.includes(domainURL)) {
    await dataModel.create(data);
    return res.status(201).json({
      status: "ok",
      message: "create success"
    });
  }  
  res.status(201).json({
    status: "failed",
    message: "Somthing problem here!!!"
  });
});

// create each project crediantial
exports.getProjectToken = catchAsync(async(req, res, next) => {
  let userID = req.body.userID;
  let domainURL = await authModel.findById(userID);
    domainURL = domainURL.domain;

  let oldProData = await projectModel.findById(userID);
  if (oldProData === null || oldProData === undefined || 
    oldProData.length < 3) {
    let projectToken = Math.random().toString(36).substr(2, 8);
    let newProData = {
      _usertoken: userID,
      _project: projectToken,
      _userdomain: domainURL
    }
    let createData = await projectModel.create(newProData);
    if (createData) {
      return res.status(200).json({
        status: "ok",
        projectToken
      });
    }
  } else {
    res.status(200).json({
      status: "failed",
      message: "update your plan"
    });
  }
});