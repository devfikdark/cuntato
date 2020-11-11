import { Request, Response, NextFunction } from "express";
import authModel from '../model/authModel';
import dataModel from '../model/dataModel';
import projectModel from '../model/projectModel';

export class appController {
  // Get data user project wise
  public getFromData = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');

    let projectToken = req.query.project;
    let getData = await dataModel.find({ _project: projectToken });
    if (getData.length > 0) {
      return res.json({
        status: "ok",
        length: getData.length,
        getData
      });
    }
    this.resMsg(res, "ok", "Nothing found here!!!");
  }

  // Insert data user project wise
  public postFromData = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');

    let data = JSON.parse(req.body.data);
    let nowTime = new Date();
      data.createAt = nowTime.toLocaleString();
    let projectToken = req.body.projectID
    let currentURL = req.body.currentURL;
    let domainURL = await projectModel.findOne({ _projecttoken: projectToken });
    
    if (!domainURL) {
      return this.resMsg(res, "failed", "Project not found !!!");
    }
    let isTrue = this.isMatchURL(domainURL._userdomain, currentURL); 
    if (!isTrue) {
      return this.resMsg(res, "failed", "Unauthorize user!!!");
    } else {
      let newData = {
        data: data,
        _project: projectToken
      }; 
      if (isTrue) {
        await dataModel.create(newData);
        return this.resMsg(res, "ok", "create success");
      }
    }
    this.resMsg(res, "failed", "Somthing problem here!!!");
  };

  // create each project crediantial
  public getProjectToken = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');

    let userID = req.body.userID;
    let projectName = req.body.projectName;
    let domainURL = req.body.domainURL;
   
    if (projectName === null || projectName === undefined || 
        projectName.length === 0) {
      return this.resMsg(res, "failed", "Provide a valid project name");
    }
    if (domainURL === null || domainURL === undefined || 
        domainURL.length === 0) {
      return this.resMsg(res, "failed", "Provide a valid domain URL");
    }
    // get project count
    let oldProData = await projectModel.find({ _usertoken: userID });
    // check duplicate project name
    let doubleName = await projectModel.findOne({ _projectname: projectName });  
    if (doubleName) {
      return this.resMsg(res, "failed", "Already use this name");
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
        return this.resMsg(res, "ok", "create success");
      } else {
        return this.resMsg(res, "failed", "Somthing want wrong");
      }
    } else {
      this.resMsg(res, "failed", "update your plan");
    }
  }

  // get project list
  public getProjectList = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');

    let userID = req.query.userID;
    let data =await projectModel.find({ _usertoken: userID });
    this.resData(res, "ok", data);
  }

  // get project count
  public getProjectCount = async(req, res, next) => {
    res.setHeader('Content-type', 'application/json');

    const userID = req.query.userID;
    let data = await projectModel.find({ _usertoken: userID });
    data = data.length > 0 ? data.length : 0;
    this.resData(res, "ok", data);
    return;
  }
  
  // get project domain
  public getProjectDomain = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');
    
    const projectToken = req.query.projectToken;
    const data = await projectModel.findOne({ _projecttoken: projectToken });
    this.resData(res, "ok", data._userdomain);
  }

  // update project url
  public updateURL = async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');

    let projectToken = req.body.projectToken;
    let newURL = req.body.newURL;
    let oldUrl = await projectModel.findOne({ _projecttoken: projectToken });
      oldUrl = oldUrl._userdomain;
   
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
      this.resMsg(res, "ok", "update your domain");
    }
    this.resMsg(res, "failed", "somthing problem!!!");
  }

  /** Response session **/
  public resMsg = (res, status, message) => {
    return res.json({
      status: status,
      message: message
    });
  }

  public resData = (res, status, data) => {
    return res.json({
      status: status,
      data
    });
  }

  // URL authentication
  public isMatchURL = (domainURL, currentURL) => {
    for (let i = 0; i < domainURL.length; i++) {
      if (domainURL[i] !== currentURL[i]) 
        return false;
    }
    return true;
  }
}
