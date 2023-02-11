//import function
//describe what test should do
//call function
//assert the expected response with actual response

// const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/index.js');

// const QuestionData = {

//     product_id: 5,
//     results: [{
//           question_id: 37,
//           question_body: "Why is this product cheaper here than other sites?",
//           question_date: "2018-10-18T00:00:00.000Z",
//           asker_name: "williamsmith",
//           question_helpfulness: 4,
//           reported: false,
//           answers: [{
//             68: {
//               id: 68,
//               body: "We are selling it here without any markup from the middleman!",
//               date: "2018-08-18T00:00:00.000Z",
//               answerer_name: "Seller",
//               helpfulness: 4,
//               photos: []
//             }
//           }]
//         }
//       ]
// }

describe('Test the GET Questions route', () => {
  it('should respond with 200 for the GET request', async () => {
    // const response = await request(app).get('http://localhost:8080/qa/questions').query({product_id: '5'});
    // const response = await request(app).get('http://localhost:8080/qa/questions?product_id=5');
    const response = await request('http://localhost:8080').get('/qa/questions?product_id=5');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test PUT Mark Questions as Helpul route', () => {
  it('should respond with 200 for the PUT request', async () => {
    // const response = await request(app).put('http://localhost:8080/qa/questions/?question_id=5/helpful');
    const response = await request('http://localhost:8080').put('/qa/questions?question_id=5/helpful')
    .field("helpfulness": +1);
    console.log(response.statusCode)
    expect(response.statusCode).toBe(200);
  })
})


