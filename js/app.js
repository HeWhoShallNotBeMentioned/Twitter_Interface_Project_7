const express = require('express');

const Twit = require('twit');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const config = require(__dirname + "./../config.js");
const T = new Twit(config);

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/static',express.static('public'));
app.set('view engine', 'pug');

  app.use( (req, res, next) => {
    T.get('account/verify_credentials', {skip_status: false}, function (err, data, response) {
      if(err) {
        return next(err);
      }
        req.bannerImg = data.profile_banner_url;
        req.profileImg = data.profile_image_url;
        req.screenName = '@' + data.screen_name;
        req.screenName2 = data.screen_name;
        req.userId = data.id_str;
        req.name = data.name;
        req.friendsCount = data.friends_count;
        return next();
      });
    });

  app.use ((req, res, next) => {
    T.get('statuses/user_timeline', {screen_name: req.screenName, count: 5}, function(err, data, response) {
      if(err) {
        return next(err);
      }
      req.tweets = data;
      return next();
    });
  });

  app.use((req, res, next) => {
    T.get('friends/list', { count: 5 },  function (err, data, response) {
      if(err) {
        return next(err);
      }
        req.friends = data.users;
        return next();
    });
  });

  app.use((req, res, next) => {
    T.get('direct_messages', { count: 5 },  function (err, data, response) {
      if(err) {
        return next(err);
      }
      req.messages = data;
      return next();
    });
  });

  // app.use((req, res, next) => {
  //   T.post("statuses/update", {status: req.body.tweetName},function(err, data, response) {
  // });
  //   res.render('index' , {
  //         bannerImg: req.bannerImg,
  //         profileImg: req.profileImg,
  //         screenName: req.screenName,
  //         screenName2: req.screenName2,
  //         name: req.name,
  //         friendsCount: req.friendsCount,
  //         friends: req.friends,
  //         tweets: req.tweets,
  //         messages: req.messages
  //       });
  //
  //   setTimeout(next, 500);
  //});

  app.get('/', function (req, res) {
    res.render('index', {

      bannerImg: req.bannerImg,
      profileImg: req.profileImg,
      screenName: req.screenName,
      screenName2: req.screenName2,
      name: req.name,
      friendsCount: req.friendsCount,
      friends: req.friends,
      tweets: req.tweets,
      messages: req.messages
    });
  });


  app.use(function(req, res) {
    res.status(400);
    res.render('404.pug', {title: '404: File Not Found'});
  });

  app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500.pug', {title:'500: Internal Server Error', error: error});
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port: ');
});
