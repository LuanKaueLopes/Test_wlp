const express = require('express'),
      app = express(),
      port = process.env.PORT || 8080,
      log = require('node-pretty-log'),
      findController = require('./controller/Find'),
      saveController = require('./controller/Save'),
      bodyParser = require('body-parser');

app.use(bodyParser.json());

log('info', `registering routes`);
findController(app);
saveController(app);

log('success', `Starting port at server ${port}`);
app.listen(port);