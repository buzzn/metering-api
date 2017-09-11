"use strict"

var chai = require("chai");
const expect = chai.expect;

require('dotenv').config()
const mongodbHost = process.env.MONGODB_HOST
const mongodbCollection = process.env.MONGODB_COLLECTION
const MongoClient = require('mongodb').MongoClient

const mongo = require('../libs/mongo.js');

const moment = require('moment')

const DatabaseCleaner = require('database-cleaner');
const mongodbCleaner = new DatabaseCleaner('mongodb'); //type = 'mongodb|redis|couchdb'




describe('mongodb', () => {



  it('get singleValue', async () => {

    const start = new Date(2017,0,1)
    const end   = new Date(2017,0,1,1)
    let docs = []
    for (let m = moment(start); m.isBefore(end); m.add(60, 'seconds')) {
      await mongo.addReading('easymeter', '12345', timestamp.getTime())
    }

    // const timestamp = new Date(2017,0,1,22)
    // const result = await mongo.addReading('easymeter', '12345', timestamp.getTime())
    // console.log(result);
  })



  after(async () => {
    const db = await MongoClient.connect(mongodbHost)
    mongodbCleaner.clean(db, () => {
      db.close()
    })
  })


})
