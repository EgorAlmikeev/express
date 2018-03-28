const express = require('express');
const { get } = require('axios');
const moment = require('moment');
const fs = require('fs');
const USERS_URL = 'https://kodaktor.ru/j/users';
const express_handlebars = require('express_handlebars');

const PORT = 4321;
const app = express();

const myLogger =  (req, res, next) => {
  console.log('LOGGED : ' + moment().format('DD.MM.YYYY HH:mm:ss') + "\t" + req.url);
  fs.appendFileSync("log.txt", (moment().format('DD.MM.YYYY HH:mm:ss')).toString() + " " + req.url + "\n",  "ascii");
  next();
};

app
	.use(myLogger)
   	.get('/users', async r => {
      const {data: {users: items}} = await get(URL);
      r.res.render('list', {users: items})
     })
   	.use(r => r.res.status(404).end('Still not here, sorry!'))
   	.use((e, r, res, n) => res.status(500).end(`${e}`))
    .engine('handlebars', express_handlebars({ layoutsDir: 'list' }))
    .set('view engine', 'handlebars')
   	.listen(process.env.PORT || PORT, () => console.log("My pid is very big : " + process.pid));