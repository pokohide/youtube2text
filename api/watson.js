'use strict'

const Promise = require('bluebird')
const fs = require('fs')
const watson = require('watson-developer-cloud')
const config = {
  username: process.env.BM_USERNAME,
  password: process.env.BM_PASSWORD,
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
}
const speech_to_text = watson.speech_to_text(config)

const wav2text = function(filename) {
  console.log('username is ' + process.env.BM_USERNAME)
  console.log('password is ' + process.env.BM_PASSWORD)
  return new Promise(function(resolve, reject) {
    const params = {
      content_type: 'wav',
      timestamps: true,
      continuous: true
    }

    let results = []
    const recognizeStream = speech_to_text.createRecognizeStream(params)

    // pipe in some audio
    fs.createReadStream(filename).pipe(recognizeStream)

    recognizeStream.setEncoding('utf8')

    recognizeStream.on('results', function(e) {
      if (e.results[0].final) {
        results.push(e)
        console.log(e)
        console.log('============================')
      }
    })

    recognizeStream.on('data', function() {
      console.log('data')
    })

    recognizeStream.on('error', function(err) {
      console.log('error is occured')
      console.log(err)
    })

    recognizeStream.on('connection-close', function() {
      console.log(results)

    })
  })
}

exports.wav2text = wav2text


// exports.watsonSpeechToText = function(audioFile) {

// ¥
//     recognizeStream.on('connection-close', function() {
//         var transcriptFile = path.join(__dirname, 'transcript.json');

//       fs.writeFile(transcriptFile, JSON.stringify(results), function(err) {
//         if (err) {
//           util.handleError(err);
//         }
//         resolve();
//       });
//     });
//   });
// };