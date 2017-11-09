const express = require('express');

const Twit = require('twit');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');

const T = new Twit(config);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let profileInfo = {
  bannerImg: "",
  profileImg: "",
  screenName: "",
  name: ""
};

T.get('account/verify_credentials', function (err, data, response) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.
    // See https://github.com/ttezel/twit#tgetpath-params-callback
    // for details.

    //console.log('data', data);
    //console.log("img banner ", data.profile_banner_url);
    profileInfo.bannerImg = data.profile_banner_url;
    profileInfo.profileImg = data.profile_image_url;
    profileInfo.screenName = '@' + data.screen_name;
    profileInfo.name = data.name;
    //response.send('<img src=' + data.profile_banner_url + 'alt="banner">');
    //response.send("meow");
    //response.locals.banner = data.profile_banner_url;
    //console.log(profileInfo.bannerImg);
  });

  T.get('friends/list', { count: 5 },  function (err, data, response) {
    console.log('friends/list', data);
  });

app.get('/', function (request, response) {
  console.log("profileInfo ",  profileInfo);
  response.render('index', {"profileInfo": profileInfo});
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
