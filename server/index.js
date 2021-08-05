const express = require('express');
const formidableMiddleware = require('express-formidable');

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
  console.log(`Fetching questions for product: ${req.params.id}`)
  models.getQuestions({product_id: req.params.id})
  .then( (data) => {
    res.status(200).send(data.data);
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.post('/qa/questions/', (req, res) => {
  models.addQuestion(req.body.body)
  .then(() => {
    res.status(201).send();
    console.log(`Succesful Question Posted!!!`)
  })
  .catch((e) => {
    console.log(e);
  });
});


app.put('/qa/questions/:question_id/helpful', (req, res) => {
  //console.log(`Put question as helpful: ${req.params.question_id}`)
  models.putQuestionHelp(req.params.question_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Question Helpful!!! `)
  })
  .catch( (e) => {
    console.log(e);
  });
});
//
app.put('/qa/questions/:question_id/report', (req, res) => {

  models.putQuestionReport(req.params.question_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Question as MEAN!!! `)
  })
  .catch((e) => {
    console.log(e);
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {

  models.getAnswers(req.params.question_id)
  .then((data) => {
    res.status(200).send(data.data);
    console.log(`Got Answers`);
  })
  .catch((e) => {
    console.log(e);
  })
});

app.post(`/qa/questions/:question_id/answers`, (req, res) => {

  models.addAnswer(req.params.question_id, req.body.body)
    .then(() => {
      console.log(`Succesful Posted Answer!!!`)
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
    });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

  models.putAnswerHelp(req.params.answer_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Answer Helpful!!! `)
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {

  models.putAnswerReport(req.params.answer_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Answer as MEAN!!! `)
  })
  .catch((e) => {
    console.log(e);
  });
});

app.use(formidableMiddleware({ multiples: true }))
// Takes a post request of images, uploads images to cloudinary API, once all uploads complete, returns the resultant URLs
app.post('/upload', (req, res) => {
  const reqData = req.files.validPics;
  let uploads = [];

  if (Array.isArray(reqData)) {
    uploads = reqData.map(image => models.postUpload(image.path));
  } else {
    uploads = [models.postUpload(reqData.path)];
  }

  Promise.all(uploads)
    .then(images => {
      const urls = images.map(({ url }) => url);
        return res.status(200).send(urls);
    })
    .catch(error => {
      console.log(`Failed at router with: \n ${error}`);
      return res.status(500).send();
    });
});

app.listen(port, () => {
  console.log(`App listening at post:${port}`);
});