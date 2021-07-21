const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('./client/dist'));

app.get('/', (req, res) => {
  res.status(200).send('GET success');
})

app.listen(port, () => {
  console.log(`App listening at post:${port}`);
})