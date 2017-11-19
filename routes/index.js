const app = require('express');
const router = app.Router();

  router.get('/', function (req, res) {
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




module.exports = router;
