/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const COLLECTION_NAME = 'issue-tracker';

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        let collection = db.collection(COLLECTION_NAME);
        
      })
    })
    
    .post(function (req, res){
      var project = req.params.project;
      var issue = req.body;
      let createdOn = new Date();
      issue.created_on = createdOn;
      issue.updated_on = createdOn;
      issue.open = true;
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        let collection = db.collection(COLLECTION_NAME);
        collection.insertOne(issue, err => {
          if (err) console.log(err);
        })
        db.close();
      })
    })
    
    .put(function (req, res){
      var project = req.params.project;
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        let collection = db.collection(COLLECTION_NAME);
    
      })
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        let collection = db.collection(COLLECTION_NAME);
    
      })
    });
    
};
