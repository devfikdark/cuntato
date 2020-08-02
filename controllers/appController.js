const catchAsync = require('./../utils/catchAsync');
const dataModel = require('../model/dataModel');
const projectModel = require('../model/projectModel');

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
    data.createAt = Date.now();
  let projectToken = req.body.projectID
  let currentURL = req.body.currentURL;
  let domainURL = await projectModel.findOne({ _projecttoken: projectToken });
  
  res.setHeader('Content-type', 'application/json');
  /*
  if (!domainURL) {
    resMsg(res, 200, "failed", "Project not found !!!");
    return
  }
  let isTrue = isMatchURL(domainURL._userdomain, currentURL);*/
  let isTrue = true; // testing purpose
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
  let domainURL = req.body.domainURL;

  res.setHeader('Content-type', 'application/json');
  if (projectName === null || projectName === undefined || 
      projectName.length === 0) {
    return resMsg(res, 200, "failed", "Provide a valid project name");
  }
  if (domainURL === null || domainURL === undefined || 
      domainURL.length === 0) {
    return resMsg(res, 200, "failed", "Provide a valid domain URL");
  }
  // get project count
  let oldProData = await projectModel.find({ _usertoken: userID });
  // check duplicate project name
  let doubleName = await projectModel.findOne({ _projectname: projectName });  
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
      resMsg(res, 200, "ok", "create success");
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
});

exports.getProjectCount = catchAsync(async(req, res, next) => {
  let userID = req.query.userID;
  let data = await projectModel.find({ _usertoken: userID });
  
  if (data) data = data.length;
  else data = 0;
  res.setHeader('Content-type', 'application/json');
  resData(res, 200, "ok", data);
  return;
});

exports.getProjectDomain = catchAsync(async(req, res, next) => {
  let projectToken = req.query.projectToken;
  let data = await projectModel.findOne({ _projecttoken: projectToken });
  res.setHeader('Content-type', 'application/json');
  resData(res, 200, "ok", data._userdomain);
  return;
});

exports.updateURL = catchAsync(async(req, res, next) => {
  let projectToken = req.body.projectToken;
  let newURL = req.body.newURL;
  let oldUrl = await projectModel.findOne({ _projecttoken: projectToken });
    oldUrl = oldUrl._userdomain;

  res.setHeader('Content-type', 'application/json');
  if (oldUrl) {
    let projectCnt = await projectModel.find({ _projecttoken: projectToken });
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
