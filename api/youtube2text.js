"use strict";

const youtubedl = require('youtube-dl')
const fs = require('fs')
const output = 'myvideo.mp4'
const q = require('q')
// const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
//   // Optional arguments passed to youtube-dl.
//   ['--format=18'],
//   // Additional options can be given for calling `child_process.execFile()`.
//   { cwd: __dirname });

// POST /api/youtube2text
const youtube2text = function* (next) {
  const deferred = q.defer()
  let downloaded = 0
  const url = 'http://www.youtube.com/watch?v=90AiXO1pAiA'

 
  //////////////////////////////////////////////////////////////////
  // if(fs.existsSync(output)) downloaded = fs.statSync(output).size

  // const video = youtubedl(url, ['--format=18'], { start: downloaded, cwd: __dirname })
  // video.on('info', function(info) {
  //   console.log('Download started')
  //   console.log('filename: ' + info._filename)

  //   const total = info.size + downloaded
  //   console.log('size: ' + total)

  //   if(downloaded > 0) {
  //     console.log('resuming from: ' + downloaded)
  //     console.log('remaining bytes: ' + info.size)
  //   }
  // })

  // video.pipe(fs.createWriteStream('myvideo.mp4', { flags: 'a' }))

  // video.on('complete', function complete(info) {
  //   'use strict';
  //   console.log('filename: ' + info._filename + ' already downloaded')
  // })

  // video.on('end', function() {
  //   console.log('finished downloading')
  //   deferred.resolve({ message: 'ok'})
  // })
  ///////////////////////////////////////////////////////////////////

  youtubedl.exec(url, ['-x', '--audio-format', 'wav'], {}, function exec(err, output) {
    if (err) { throw err; }
    console.log(output.join('\n'));
    deferred.resolve({ result: output })
  })

  // youtubedl.exec(url ,['-x', '--audio-format', 'wav'], {}, function(err, output) {
  //   if(err) throw err;
  //   deferred.resolve({ result: output })
  // })
  this.body = yield deferred.promise
}

module.exports = youtube2text
