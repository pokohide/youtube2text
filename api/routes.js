"use strict";

const Router = require('koa-router')
const path = require('path')
const json = require('koa-json')
const body = require('koa-body')()

// methods
const youtube2text = require('./youtube2text')

const route = (app) => {
  app.use(json())  // json対応

  const API = new Router({
    prefix: '/api'
  })

  API
    .get('/youtube2text', youtube2text)

  app
    .use(API.routes())
    .use(API.allowedMethods())

  app.use(function*(next){
    yield next;
    console.log('after response');
  })
}

module.exports = route
