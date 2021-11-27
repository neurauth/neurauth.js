# neurauth.js
Work in Progress

## Installation

First install [Node.js](http://nodejs.org/) Then:

```sh
$ npm install neurauth
```

## Importing

```javascript
// Using Node.js `require()`
const neurauth = require('neurauth');

// Using ES6 imports
import { setupCredentials } from 'neurauth';
```
## Setup

Before any action, you should setup your credentials generated at our website.

```javascript
const neurauth = require('neurauth');

const credentials = { 
    apiKey: "yourApiKey",
    appId: "yourApplicationId"
};

neurauth.setupCredentials(credentials);
```

Now you can operate your entities freely!


## Data operations
### List objects


```javascript
const neurauth = require('neurauth');

await neurauth.list("entityName");
```

### Get Object


```javascript
const neurauth = require('neurauth');

await neurauth.get("entityName", "entityId");
```


### Insert new object


```javascript
const neurauth = require('neurauth');

const data = {
    name: "Carlos",
    age: 35
};

await neurauth.insert("entityName", data);
```


### Update object


```javascript
const neurauth = require('neurauth');

const updatedData = {
    age: 33
};

await neurauth.update("entityName", "entityId", updatedData);
```


### Remove object


```javascript
const neurauth = require('neurauth');

await neurauth.remove("entityName", "entityId");
```

## Authentication

With Neurauth <b>Plastic Heart</b>, we can enable authenticantion with just one line of code!

### Express middleware
```javascript
const neurauth = require('neurauth');
const express = require('express');

var app = express();

app.use(neurauth.plasticHeart());
```

Now your application has authentication routes! If you try a request to any configured route on your API, you will receive an `UnauthorizedAccessError`, that's because you need to be authenticated now. Your application is checking for the header `x-access-token`, but how can I get one? Creating an account and login in, check the next section!

### Signup
POST `/api/auth/signup`

Our default user body is:
```
{
    "email": string
    "password: string
}
```
But you can customise with new data and change the entity name, do as you wish!
This options are availabe in the authentication section of you app page.


### Login
POST `/api/auth/login`

Just send the user <b>email</b> and <b>password</b>, as response you will receive the user x-access-token, with this you will unlock your api with the current user data to be used.


## License

Copyright (c) 2021 Ian Fireman &lt;ianfireman@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
