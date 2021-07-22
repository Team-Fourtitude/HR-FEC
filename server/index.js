const express = require('express');
const app = express();
const port = 3000;
const models = require('./models.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('./client/dist'));

app.get('/products', (req, res) => {
  //need to add functionality for page/count
  models.getProducts()
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/products/:id', (req, res) => {
  models.getProductById(req.params.id)
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/products/:id/styles', (req, res) => {
  models.getStylesById(req.params.id)
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/products/:id/related', (req, res) => {
  models.getRelatedProducts(req.params.id)
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/reviews', (req, res) => {
  //need to add functionality for defining page, count, sort, product_id
  models.getReviews()
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/reviews/meta/:id', (req, res) => {
  models.getReviewMetadata(req.params.id)
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.get('/qa/questions/:id', (req, res) => {
  models.getQuestions(req.params.id)
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.listen(port, () => {
  console.log(`App listening at post:${port}`);
});