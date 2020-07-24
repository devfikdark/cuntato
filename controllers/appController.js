let fs = require('fs');
let jsonFile = `${__dirname}/../data/formData.json`;
let fromDataModel = require('./../model/fromDataModel');
let catchAsync = require('./../utils/catchAsync');

exports.getData = (req, res, next) => {
  fs.readFile(jsonFile, 'utf-8', (err, data) => {
    if (err) next(err);
    data = JSON.parse(data);
    res.status(200).json(data);
  });
}

exports.postData = (req, res, next) => {
  let formData = req.body; // new data get from req
  fs.readFile(jsonFile, 'utf-8', (err, data) => {
    newArray = JSON.parse(data); // convert res data to array
    newArray.push(formData); // new data push array
    newArray = JSON.stringify(newArray) // convert array to json string
    fs.writeFile(jsonFile, newArray, 'utf-8', (err) => {
      if (err) next(err);
      res.send(newArray);
    });
  });
}

exports.postFromData = catchAsync(async(req, res, next) => {
  let data = req.body;
  let createData = await fromDataModel.create(data);
  res.status(201).json(createData);
});

exports.getFromData = catchAsync(async(req, res, next) => {
  let getData = await fromDataModel.find();
  res.status(201).json(getData);
});