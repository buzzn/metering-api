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

  before(async () => {
    const db = await MongoClient.connect(mongodbHost)
    try {
      const start = new Date(Date.UTC(2017,0,1))
      const end   = new Date(Date.UTC(2017,0,1,23))
      let docs = []
      for (let m = moment(start); m.isBefore(end); m.add(60, 'minutes')) {
        docs.push({ timestamp: m.toISOString(), meterSerialnumber: 'aaa' })
        docs.push({ timestamp: m.toISOString(), meterSerialnumber: 'bbb' })
        docs.push({ timestamp: m.toISOString(), meterSerialnumber: 'ccc' })
      }
      let collection = await db.collection(mongodbCollection)
      collection.insertMany(docs, (err, result) => {
        return result
      })
      db.close()
    }
    catch(err) {
      done(err)
    }
  })



  it('get singleValue', async () => {
    const timestamp = new Date(2017,0,1,22)
    const result = await mongo.valueCollection(['aaa','bbb'], timestamp.toISOString())
    // expect(result[0]['meterSerialnumber']).to.equal('aaa')
  })



  after(async () => {
    const db = await MongoClient.connect(mongodbHost)
    mongodbCleaner.clean(db, () => {
      db.close()
    })
  })


})
