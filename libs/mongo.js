'use strict';
require('dotenv').config()
const mongodbHost = process.env.MONGODB_HOST
const mongodbCollection = process.env.MONGODB_COLLECTION
const Mongodb = require('mongodb')

const MongoClient = Mongodb.MongoClient
const MongoLogger = Mongodb.Logger
//MongoLogger.setLevel('debug')

exports.addReading = async (meterBrand, meterSerialnumber, timestamp, resolution) => {
  const db          = await MongoClient.connect(mongodbHost)
  const collection  = await db.collection(mongodbCollection)

  const doc         = { 
                        _id: meterBrand + ':' + meterSerialnumber + ':' + timestamp,
                        name: "David",
                        title: "About MongoDB"
                      };

  const response    = await collection.insert(doc)

  return response
}


// Register Ticker or Bubble chart
exports.valueCollection = async (meterSerialnumbers, timestamp) => {
  const db          = await MongoClient.connect(mongodbHost)
  const collection  = await db.collection(mongodbCollection)
  const response    = await collection.find({
                                meterSerialnumber: { $in: meterSerialnumbers },
                                timestamp: { $gte: timestamp }
                              })
                              .limit(meterSerialnumbers.length)
                              .toArray()
  return response
}

// Group Ticker
exports.valueAggregation = async (meterSerialnumbers, timestamp) => {
}

// Register or Group Power/Energy Chart
exports.rangeAggregation = async (meterSerialnumbers, timestamp, resolution) => {
}
