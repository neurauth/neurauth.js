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

## List objects


```javascript
const neurauth = require('neurauth');

await neurauth.list("entityName");
```

## Get Object


```javascript
const neurauth = require('neurauth');

await neurauth.get("entityName", "entityId");
```


## Insert new object


```javascript
const neurauth = require('neurauth');

const data = {
    name: "Carlos",
    age: 35
};

await neurauth.insert("entityName", data);
```


## Update object


```javascript
const neurauth = require('neurauth');

const updatedData = {
    age: 33
};

await neurauth.update("entityName", "entityId", updatedData);
```


## Remove object


```javascript
const neurauth = require('neurauth');

await neurauth.remove("entityName", "entityId");
```