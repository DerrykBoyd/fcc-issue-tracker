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
        if (err) console.log('Failed to connect to db' + err);
        console.log('connected to db');
        let collection = db.collection(COLLECTION_NAME);
        collection.insertOne(issue, err => {
          if (err) res.send(err);
          else res.send(issue);
        })
        db.close();
      })
    })
    
    .put(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
      if (!ObjectId.isValid(id)) {
        res.send(`${id} is not a valid _id`);
        return;
      }
      let o_id = new ObjectId(id)
      console.log(req.body);
      let updatedOn = new Date();
      let updateObj = {updated_on:updatedOn};
      if (req.body.issue_title) updateObj.issue_title = req.body.issue_title;
      if (req.body.issue_text) updateObj.issue_text = req.body.issue_text;
      if (req.body.created_by) updateObj.created_by = req.body.created_by;
      if (req.body.assigned_to) updateObj.assigned_to = req.body.assigned_to;
      if (req.body.status_text) updateObj.status_text = req.body.status_text;
      if (req.body.open) updateObj.open = req.body.open;
      console.log(Object.keys(updateObj).length);
      if (Object.keys(updateObj).length === 1) {
        res.send('no updated field sent');
        return;
      }
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        if (err) console.log('Failed to connect to db' + err);
        console.log('connected to db');
        let collection = db.collection(COLLECTION_NAME);
        collection.findOneAndUpdate({_id: new ObjectId(id)}
          , {$set: updateObj}
          , {returnOriginal: false}
          , (err, r) => {
            if (err) res.send('could not update '+ id);
            if (!r.value) {
              res.send('could not update '+ id);
              return;
            }
            else res.send('successfully updated');
          }
          )
      })
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        let collection = db.collection(COLLECTION_NAME);
    
      })
    });
    
};
