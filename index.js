'use strict';
require('dotenv').config()

const Router = require('koa-router');
const router = new Router();

const Koa = require('koa')
const app = new Koa()


var MongoClient = require('mongodb').MongoClient

router
  .get('/meters/:id', async (ctx) => {
    let meterSerialnumber = ctx.params.id
    ctx.body = await lastReading(meterSerialnumber)
  })

const lastReading = async function (meterSerialnumber) {
  let db = await MongoClient.connect(process.env.MONGODB_HOST)
  try {
    let collection = db.collection(process.env.MONGODB_COLLECTION)
    return await collection
                    .find({meterSerialnumber: meterSerialnumber})
                    .sort({$natural:-1})
                    .limit(1)
                    .toArray()
  } finally {
    db.close();
  }
}

app
  .use(router.routes())
  .use(router.allowedMethods());

//http://localhost:3000/meters/60328159
app
  .listen(3000)
