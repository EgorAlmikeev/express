# express

### index.js
```javascript
const express = require('express');
const { get } = require('axios');
const moment = require('moment');
const fs = require('fs');
const USERS_URL = 'https://kodaktor.ru/j/users';

const PORT = 4321;
const app = express();

const myLogger =  (req, res, next) => {
  let log_string = moment().format('DD.MM.YYYY HH:mm:ss') + "\t" + req.url;
  console.log('LOGGED : ' + log_string);
  fs.appendFileSync("log.txt", log_string + "\n",  "ascii");
  next();
};

app
	.use(myLogger)
   	.get(/users/, async r => { 
    	const { data: { users: items } } = await get(USERS_URL);
    	r.res.render('list', {title: 'Login list', items});
   	})
   	.use(r => r.res.status(404).end('Still not here, sorry!'))
   	.use((e, r, res, n) => res.status(500).end(`${e}`))
   	.set('view engine', 'pug')
   	.listen(process.env.PORT || PORT, () => console.log("My pid is very big : " + process.pid));
```
