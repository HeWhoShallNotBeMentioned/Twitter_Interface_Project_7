# _{Twitter_Interface}_

#### _{Twitter app that uses a real user account.}, {1/19/2017}_

#### By _**{Chris Underwood}**_

## Description

_{ Twitter app that uses a real user account. It uses credentials supplied in the config.js file (sample attached). Pulls down account 5 most recents tweets, friends, and direct messages. The text box on the bottom has been disabled. Many of the other details that show do not work such as the character count on the tweet message field on the bottom of the page.   }_

## Setup/Installation Requirements

* _download the files to a folder of your choice_
* _migrate to that folder via the console_
* _type node js/app.js & hit enter or nodemon js/app.js if you have nodemon installed_
* _Open a window in the browser of your choice to localhost:3000._

_{If the config credentials are good, you should see the tweets, friends, and dm fields populate.}_

## Known Bugs

_{The number of times that the tweet api can be contacted is limited which can take the application off line. Once the page is loaded, reloaded the page causes more calls to the api. }_

## Support and contact details

_{ cunderwoodmn [at] gmail {dot} com }_

## Technologies Used

_{vanilla_JS, Twitter API, npm module twit, express, node.js, Pug.js}_

### License

Copyright (c) <2017> <Chris Underwood>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2017 **_{Chris Underwood}_**


include partials/friends.pug
