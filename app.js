"use strict"

const koa = require('koa')
const app = koa()
const port = process.env.PORT || 8080

// サーバー起動
app.listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.on('error', function(err){
  log.error('server error', err);
});

app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// ルート定義
const router = require('./api/routes.js')(app);
