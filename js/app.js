const express = require('express');

const Twit = require('twit');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require("path");
const config = require(__dirname + "./../config.js");
const T = new Twit(config);

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static('public'));
//app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// const mainRoutes = require('./../routes/index.js');
// app.use(mainRoutes);

  app.use( (req, res, next) => {
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
      // setTimeout(next, 1000);
      next();
      return;
    });

    app.use ((req, res, next) => {
    T.get('statuses/user_timeline', {screen_name: "cunderwoodmn", count: 5}, function(err, data, response) {
      req.tweets = data;
      //console.log("req.tweets ",data);
    });
    next();
    return;
  });

  app.use((req, res, next) => {
    T.get('friends/list', { count: 5 },  function (err, data, response) {
      //console.log('friends/list', data);
        req.friends = data.users;
    });
    next();
    return;
  });

  app.use((req, res, next) => {
      T.get('direct_messages', { count: 5 },  function (err, data, response) {
        //console.log('direct_messages  ', data);
        req.messages = data;
      });
      setTimeout(next, 500);
  });

  app.use((req, res, next) => {
    console.log("tweetName ", req.body.tweetName);
    T.post("statuses/update", {status: req.body.tweetName},function(err, data, response) {

    });
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
    }
  );
    setTimeout(next, 500);
  });



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



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
