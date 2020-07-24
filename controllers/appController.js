let catchAsync = require('./../utils/catchAsync');
let dataModel = require('../model/dataModel');
let userModel = require('./../model/userModel')

exports.getFromData = catchAsync(async(req, res, next) => {
  let getData = await dataModel.find();
  res.status(200).json(getData);
});

exports.postFromData = catchAsync(async(req, res, next) => {
  let data = req.body;
  let createData = await dataModel.create(data);
  res.status(201).json(createData);
});

exports.getProjectToken = catchAsync(async(req, res, next) => {
  let userToken = req.body.userID;
  let userData = await userModel.find({ _usertoken: userToken });
  if (userData.length < 3 || userData.length === undefined) {
    let projectToken = "example";
    let createUserData = {
      _usertoken: userToken,
      _project: projectToken
    }
    let newUserData = await userModel.create(createUserData);
    if (newUserData) {
      return res.status(200).json(projectToken);
    }
  } else {
    res.status(200).json({
      message: "update your plan"
    });
  }
});