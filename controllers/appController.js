let catchAsync = require('./../utils/catchAsync');
let dataModel = require('../model/dataModel');
let projectModel = require('../model/projectModel');
let authModel = require('./../model/authModel');

// Get data user project wise
exports.getFromData = catchAsync(async(req, res, next) => {
  let projectToken = req.body.projectID;
  let getData = await dataModel.find({ _project: projectToken });
  if (getData.length > 0) {
    return res.status(200).json({
      status: "ok",
      length: getData.length,
      getData
    });
  }
  statusMsg(res, 200, "ok", "Nothing found here!!!");
});

// Insert data user project wise
exports.postFromData = catchAsync(async(req, res, next) => {
  let data = req.body.data;
  let projectToken = req.body.projectID
  let currentURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  let domainURL = await projectModel.findOne({ _projecttoken: projectToken });
  let isTrue = isMatchURL(domainURL._userdomain, currentURL);

  if (!isTrue) {
    return statusMsg(res, 401, "failed", "Unauthorize user!!!");
  } else {
    let newData = {
      data: data,
      _project: projectToken
    }; 
    console.log(newData)   
    if (isTrue) {
      await dataModel.create(newData);
      res.setHeader('Content-type', 'application/json');
      return statusMsg(res, 201, "ok", "create success");
    }  
  }
  res.setHeader('Content-type', 'application/json');
  statusMsg(res, 401, "failed", "Somthing problem here!!!");
});

// create each project crediantial
exports.getProjectToken = catchAsync(async(req, res, next) => {
  let userID = req.body.userID;
  let projectName = req.body.projectName;
  // get domain URL
  let domainURL = await authModel.findById(userID);
  domainURL = domainURL.domain;
  // get project count
  let oldProData = await projectModel.find({ _usertoken: userID });
  // check duplicate project name
  let doubleName = await projectModel.findOne({ _projectname: projectName });  
  if (doubleName) {
    return statusMsg(res, 403, "failed", "Already use this name");
  }
  // create new project when project count less then 3
  if (oldProData === null || oldProData === undefined || 
    oldProData.length < 3) {
    let projectToken = Math.random().toString(36).substr(2, 8);
    let newProData = {
      _usertoken: userID,
      _projecttoken: projectToken,
      _projectname: projectName,
      _userdomain: domainURL
    }
    let createData = await projectModel.create(newProData);
    console.log(createData)
    if (createData) {
      return res.status(200).json({
        status: "ok",
        projectToken
      });
    } else {
      statusMsg(res, 403, "failed", "Somthing want wrong");
    }
  } else {
    statusMsg(res, 200, "failed", "update your plan");
  }
});

// send response
function statusMsg(res, statusCode, status, message) {
  return res.status(statusCode).json({
    status: status,
    message: message
  });
}

// URL authentication
function isMatchURL(domainURL, currentURL) {
  for (let i = 0; i < domainURL.length; i++) {
    if (domainURL[i] !== currentURL[i]) 
      return false;
  }
  return true;
}