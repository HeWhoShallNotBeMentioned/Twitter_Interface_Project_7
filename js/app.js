const express = require('express');

const Twit = require('twit');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');
app.locals.moment = require('moment');
const T = new Twit(config);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

  let credentials = (req, res, next) => {
    T.get('account/verify_credentials', {skip_status: false}, function (err, data, response) {
        req.bannerImg = data.profile_banner_url;
        req.profileImg = data.profile_image_url;
        req.screenName = '@' + data.screen_name;
        req.screenName2 = data.screen_name;
        req.userId = data.id_str;
        req.name = data.name;
        req.friendsCount = data.friends_count;
      //console.log("profileInfo  ", data);
      });
      setTimeout(next, 1000);
  };

  let timeline = (req, res, next) => {
    T.get('statuses/user_timeline', {screen_name: "cunderwoodmn", count: 5}, function(err, data, response) {
      req.tweets = data;
      //console.log("id ", req.screenName2);
      //console.log("req.tweets ",data);
    });
    setTimeout(next, 1000);
  };

  let friends = (req, res, next) => {
    T.get('friends/list', { count: 5 },  function (err, data, response) {
      //console.log('friends/list', data);
        req.friends = data.users;
    });
    setTimeout(next, 1000);
  };

  let messages = (req, res, next) => {
      T.get('direct_messages', { count: 5 },  function (err, data, response) {
        console.log('direct_messages  ', data);
        req.messages = data;
      });
      setTimeout(next, 1000);
  };

  let tweet = (req, res, next) => {
    T.post();
  };

  app.use(credentials, timeline, friends, messages);

app.get('/', function (req, res) {
  //console.log("profileInfo ",  profileInfo);
  req.params.bannerImg = req.bannerImg;
  req.params.profileImg = req.profileImg;
  req.params.screenName = req.screenName;
  req.params.screenName2 = req.screenName2;
  req.params.name = req.name;
  req.params.friendsCount = req.friendsCount;
  req.params.friends = req.friends;
  req.params.tweets = req.tweets;
  req.params.messages = req.messages;
  //console.log(req.params);
  res.render('index', req.params);
});

  app.use(function(req, res) {
    res.status(400);
    res.render('404.pug', {title: '404: File Not Found'});
  });

  app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500.pug', {title:'500: Internal Server Error', error: error});
  });



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
