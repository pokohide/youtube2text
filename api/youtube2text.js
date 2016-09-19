"use strict";

const youtubedl = require('youtube-dl')
const fs = require('fs')
const path = require('path')
const q = require('q')
const speech = require('google-speech-api')
const spawn = require('child_process').spawn
const filed = require('filed')
const request = require('superagent')
const findRemoveSync = require('find-remove')
const watson = require('./watson')




// POST /api/youtube2text
const youtube2text = function* (next) {
  const deferred = q.defer()
  const v = '6JCLY0Rlx6Q'
  const url = 'https://www.youtube.com/watch?v=' + v
  let filename

  // const video = youtubedl.exec(url, ['-x', '--audio-format', 'wav'], {})
  // let size = 0
  // video.on('info', function(info){
  //   console.log('Download started')
  //   console.log('filename: ' + info._filename)
  //   filename = v + '.wav'

  //   size = info.size
  //   const file = path.join(__dirname, filename)
  //   video.pipe(fs.createWriteStream(file))
  //   console.log('size: ' + size)
  // })

  // let pos = 0
  // video.on('data', function data(chunk) {
  //   pos += chunk.length

  //   if(size) {
  //     const percent = (pos / size * 100).toFixed(2)
  //     process.stdout.cursorTo(0)
  //     process.stdout.clearLine(1)
  //     process.stdout.write(percent + '%')
  //   }
  // })
  
  // video.on('end', function end() {
  //   console.log('\nDone');
  //   deferred.resolve({ result: 'done' })
  // })

  // filenameを取得
  youtubedl.getInfo(url, function(err, info) {
    if(err) throw err;
    const extension = /(.*)(?:\.([^.]+$))/
    filename = info._filename.match(extension)[1] + '.wav'


    youtubedl.exec(url, ['-x', '--audio-format', 'wav'], {}, function exec(err, output) {
      if(err) throw err
      console.log(output.join('\n'))
      console.log('yt2mp3 is done')

      //findRemoveSync('../', {extensions: ['.wav']})
      //console.log('deleted')
      watson.wav2text(filename)
        .then(function() {
          console.log('Done!!!!')
          deferred.resolve({ result: 'ok' })
        })
    })
  })

  this.body = yield deferred.promise
}

const mp32text = function(filename) {
  const deferred = q.defer()
  const opts = {
    key: 'AIzaSyDL_5mi0oJGSzbe77vXCmzWIt2qwv7MLEM',
    file: filename
  }
  console.log(filename + ' is now converting.')
  speech(opts, function(err, results) {
    if(err) throw err
    console.log(results)
    console.log('speech is done')
    deferred.resolve(results)
  })
  return deferred.promise
}





  // var tts = spawn('stenographer', ['-t', 'wav']);
  // filed(req.files.audio.path).pipe(tts.stdin);

  // // processAudio(req.files.audio.path, function(result){
  //   // console.log(result);
  //   // res.send('Uploaded ' + req.files.audio.name + ' to ' + req.files.audio.path);
  //   tts.stdout.pipe(res);
  // // })


module.exports = youtube2text
