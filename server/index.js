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
  console.log(`Posting question for product: ${JSON.stringify(req.body)}`)
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
  console.log(`Put question as helpful: ${req.params.question_id}`)
  models.putQuestionHelp(req.params.question_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Question Helpful!!! `)
  })
  .catch( (e) => {
    console.log(e);
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log(`Put question as reported: ${req.params.question_id}`)
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
  console.log(`Getting answers: ${req.params.question_id}`)
  models.getAnswers(req.params.question_id)
  .then((data) => {
    res.status(200).send(data.data);
    console.log(`Got Answers`);
  })
  .catch((e) => {
    console.log(e);
  })
})

app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  console.log(`Posting answer from ${JSON.stringify(req.body.body.name)},
  for question ${JSON.stringify(req.params.question_id)},
  with this as the first photo ${JSON.stringify(req.body.body.photos)}`)
  models.addAnswer(req.params.question_id, req.body.body)
    .then(() => {
      res.status(200).send();
    })
    .catch(console.log);
})

// console.log(`Posting question for product: ${JSON.stringify(req.body)}`)
// models.addQuestion(req.body.body)
// .then(() => {
//   res.status(201).send();
//   console.log(`Succesful Question Posted!!!`)
// })
// .catch((e) => {
//   console.log(e);
// });

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log(`Put Answer as helpful: ${req.params.answer_id}`)
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
  console.log(`Put Answer as reported: ${req.params.answer_id}`)
  models.putAnswerReport(req.params.answer_id)
  .then(() => {
    res.status(204).send();
    console.log(`Succesful Marked Answer as MEAN!!! `)
  })
  .catch((e) => {
    console.log(e);
  });
});

app.listen(port, () => {
  console.log(`App listening at post:${port}`);
});