const axios = require('axios');
const apiKey = require('../client/env/config.js');

module.exports = {
  getProducts: (page = 1, count = 5) => {
    return axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products',
      method: 'get',
      headers: {Authorization: apiKey},
      params: { page, count }
    });
  },
  getProductById: (productId = 25168) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}`,
      method: 'get',
      headers: {Authorization: apiKey},
    });
  },
  getStylesById: (productId = 25168) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}/styles`,
      method: 'get',
      headers: {Authorization: apiKey},
    });
  },
  getRelatedProducts: (productId = 25168) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}/related`,
      method: 'get',
      headers: {Authorization: apiKey},
    });
  },
  getReviews: (page = 1, count = 3, sort = 'newest', product_id = 25168) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews`,
      method: 'get',
      headers: {Authorization: apiKey},
      params: {page, count, sort, product_id},
    });
  },
  getReviewMetadata: (product_id = 25168) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/meta`,
      method: 'get',
      headers: {Authorization: apiKey},
      params: {product_id},
    });
  },
  getQuestions: ({product_id = 25168, page = 1, count = 20}) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions`,
      method: 'get',
      headers: {Authorization: apiKey},
      params: {product_id, page, count},
    });
  },

  addQuestion: (info) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions`,
      method: 'post',
      headers: {Authorization: apiKey},
      data: info,
    });
  },

  putQuestionHelp: (question_id) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${question_id}/helpful`,
      method: 'put',
      headers: {Authorization: apiKey},
    });
  },

  putQuestionReport: (question_id) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${question_id}/report`,
      method: 'put',
      headers: {Authorization: apiKey},
    });
  },

  getAnswers: (question_id) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${question_id}/answers`,
      method: 'get',
      headers: {Authorization: apiKey},
    });
  },

  addAnswer: (question_id, info) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${question_id}/answers`,
      method: 'post',
      headers: {Authorization: apiKey},
      data: info,
    })
  },

  putAnswerHelp: (answer_id) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/answers/${answer_id}/helpful`,
      method: 'put',
      headers: {Authorization: apiKey},
    });
  },

  putAnswerReport: (answer_id) => {
    return axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/answers/${answer_id}/report`,
      method: 'put',
      headers: {Authorization: apiKey},
    });
  },
}