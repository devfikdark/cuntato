const catchAsync = require('./../utils/catchAsync');
const dataModel = require('../model/dataModel');
const projectModel = require('../model/projectModel');
const authModel = require('./../model/authModel');

// Get data user project wise
exports.getFromData = catchAsync(async(req, res, next) => {
  let projectToken = req.query.project;
  let getData = await dataModel.find({ _project: projectToken });
  
  res.setHeader('Content-type', 'application/json');
  if (getData.length > 0) {
    return res.status(200).json({
      status: "ok",
      length: getData.length,
      getData
    });
  }
  resMsg(res, 200, "ok", "Nothing found here!!!");
});

// Insert data user project wise
exports.postFromData = catchAsync(async(req, res, next) => {
  let data = req.body.data;
    data = JSON.parse(data);
  let projectToken = req.body.projectID
  let currentURL = req.body.currentURL;
  let domainURL = await projectModel.findOne({ _projecttoken: projectToken });
  
  res.setHeader('Content-type', 'application/json');
  if (!domainURL) {
    resMsg(res, 200, "failed", "Project not found !!!");
    return
  }
  let isTrue = isMatchURL(domainURL._userdomain, currentURL);
  isTrue = true; // testing purpose
  if (!isTrue) {
    resMsg(res, 200, "failed", "Unauthorize user!!!");
    return
  } else {
    let newData = {
      data: data,
      _project: projectToken
    }; 
    if (isTrue) {
      await dataModel.create(newData);
      resMsg(res, 200, "ok", "create success");
      return;
    }  
  }
  resMsg(res, 200, "failed", "Somthing problem here!!!");
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
  
  res.setHeader('Content-type', 'application/json');
  if (doubleName) {
    return resMsg(res, 200, "failed", "Already use this name");
  }
  // create new project when project count less then 3
  if (oldProData === null || oldProData === undefined || 
    oldProData.length < 3) {
    let projectToken = Math.random().toString(36).substr(2, 10);
    let newProData = {
      _usertoken: userID,
      _projecttoken: projectToken,
      _projectname: projectName,
      _userdomain: domainURL
    }
    let createData = await projectModel.create(newProData);
    if (createData) {
      resData(res, 200, "ok", projectToken);
      return;
    } else {
      resMsg(res, 200, "failed", "Somthing want wrong");
    }
  } else {
    resMsg(res, 200, "failed", "update your plan");
  }
});

exports.getProjectList = catchAsync(async(req, res, next) => {
  let userID = req.query.userID;
  let data = await projectModel.find({ _usertoken: userID });
  
  res.setHeader('Content-type', 'application/json');
  if (data.length > 0) {
    resData(res, 200, "ok", data);
    return;
  } else {
    resMsg(res, 200, "ok", "Nothing found here!!!");
  }
})

exports.updateURL = catchAsync(async(req, res, next) => {
  let userID = req.body.userID;
  let newURL = req.body.newURL;
  let oldUrl = await authModel.findById(userID);
    oldUrl = oldUrl.domain;

  let data = await authModel
    .findOneAndUpdate(
      { domain: oldUrl },
      { domain: newURL }
    );
  
  res.setHeader('Content-type', 'application/json');
  if (data) {
    let projectCnt = await projectModel.find();
      projectCnt = projectCnt.length;
    while (projectCnt--) {
      await projectModel
        .findOneAndUpdate(
          { _userdomain: oldUrl },
          { _userdomain: newURL }
        );
    }
    resMsg(res, 200, "ok", "update your domain");
    return;
  }
  resMsg(res, 200, "failed", "somthing problem!!!");
});


// send response
function resMsg(res, statusCode, status, message) {
  return res.status(statusCode).json({
    status: status,
    message: message
  });
}

function resData(res, statusCode, status, data) {
  return res.status(statusCode).json({
    status: status,
    data
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
