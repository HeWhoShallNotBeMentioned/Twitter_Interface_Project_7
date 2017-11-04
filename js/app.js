const express = require('express');
const app = express();
const Twit = require('twit');

const config = require('./../config');

const T = new Twit(config);


app.get('/', function (request, response) {
  response.send('Hello World!');
});

T.get('account/verify_credentials', function (err, data, response) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.
    // See https://github.com/ttezel/twit#tgetpath-params-callback
    // for details.

    console.log('data', data);
    console.log("img banner ", data.profile_banner_url);
    //response.send('<img src=' + data.profile_banner_url + 'alt="banner">');
    //response.send("meow!");
  });

T.get('followers/ids',  function (err, data, response) {
  console.log('followers/ids', data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
