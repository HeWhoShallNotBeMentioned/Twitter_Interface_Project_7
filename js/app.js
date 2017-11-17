const express = require('express');

const Twit = require('twit');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');

const T = new Twit(config);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// let profileInfo = {
//   bannerImg: "",
//   profileImg: "",
//   screenName: "",
//   name: "",
//   friends: [
//     { name: "",
//       screen_name: "",
//       profile_image_url: "",
//       profile_background_image_url: ""
//     }
//   ],
//   friendsCount: ""
// };
let credentials = (req, res, next) => {
  T.get('account/verify_credentials', function (err, data, response) {
      // `result` is an Object with keys "data" and "resp".
      // `data` and `resp` are the same objects as the ones passed
      // to the callback.
      // See https://github.com/ttezel/twit#tgetpath-params-callback
      // for details.
      console.log("data.profile_banner_url ",data.profile_banner_url);
      req.bannerImg = data.profile_banner_url;
      req.profileImg = data.profile_image_url;
      req.screenName = '@' + data.screen_name;
      req.name = data.name;
      req.friendsCount = data.friends_count;
      //console.log("profileInfo  ", data);
    });
    setTimeout(next, 1000);
};
let friends = (req, res, next) => {
  T.get('friends/list', { count: 5 },  function (err, data, response) {
    console.log('friends/list', data);
      req.friends = data.users;
  });
  setTimeout(next, 1000);
};
  app.use(credentials, friends);

app.get('/', function (req, res) {
  //console.log("profileInfo ",  profileInfo);
  req.params.bannerImg = req.bannerImg;
  req.params.profileImg = req.profileImg;
  req.params.screenName = req.screenName;
  req.params.name = req.name;
  req.params.friendsCount = req.friendsCount;
  req.params.friends = req.friends;
  console.log(req.params);
  res.render('index', req.params);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
