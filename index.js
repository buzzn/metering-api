'use strict';

console.log(`This processor architecture is ${process.arch}`);
process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));

function shutdown(signal) {
  return (err) => {
    console.log(`${ signal }...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      console.log('...waited 5s, exiting.');
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}


const Router = require('koa-router');
const router = new Router();

const Koa = require('koa')
const app = new Koa()

const mongo = require('./libs/mongo.js');

router
  .get('/meters/:id', async (ctx) => {
    let meterSerialnumber = ctx.params.id
    ctx.body = await mongo.queryValue(meterSerialnumber)
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .listen(3000)
