require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static(__dirname + process.env.STATIC));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + process.env.INDEX);
});

app.listen(process.env.PORT || 4200, () => {
  console.log('Server started..........');
});
