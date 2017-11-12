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
  name: "",
  friends: [
    { name: "",
      screen_name: "",
      profile_image_url: "",
      profile_background_image_url: ""
    }
  ],
  friendsCount: ""
};

T.get('account/verify_credentials', function (err, data, response) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.
    // See https://github.com/ttezel/twit#tgetpath-params-callback
    // for details.

    profileInfo.bannerImg = data.profile_banner_url;
    profileInfo.profileImg = data.profile_image_url;
    profileInfo.screenName = '@' + data.screen_name;
    profileInfo.name = data.name;
    profileInfo.friendsCount = data.friends_count;
    //console.log("profileInfo  ", data);
  });

  T.get('friends/list', { count: 5 },  function (err, data, response) {
    console.log('friends/list', data);
    for (let a = 0; a < 5; a++) {
      profileInfo.friends.name[a] = data.users[a].name;
      profileInfo.friends.screen_name[a] = data.users[a].screen_name;
      profileInfo.friends.profile_image_url[a] = data.users[a].profile_image_url;
      profileInfo.friends.profile_background_image_url[a] = data.users[a].profile_background_image_url;
    }
  });

app.get('/', function (request, response) {
  console.log("profileInfo ",  profileInfo);
  response.render('index', {"profileInfo": profileInfo});
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
