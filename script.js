import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

// export const errorRate = new Rate('errors');

export const options = {
  discardResponseBodies: true,
  scenarios: {
    questions: { //name of scenario
      executor: 'constant-arrival-rate',

      //test duration
      duration: '60s',
      rate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 2,
      maxVUs:200,
    }
  }
}

export default function () {
  let max = 1000011;
  let min = 900000;
  const productId = Math.floor(Math.random() * (max - min) + min);
  // const url = `http://localhost:8080/qa/questions?product_id=${productId}`;
  const url = `http://ec2-54-165-46-41.compute-1.amazonaws.com:8080/questions?product_id=${productId}`;


  http.get(url);

//   check(http.get(url), {
//     "status is 200": (r) => r.status === 200
//   });
}

// export default function () {
//   let max = 3518973;
//   let min = 3167075;
//   const questionId = Math.floor(Math.random() * (max - min) + min);
//   const url = `http://localhost:8080/qa/questions/${questionId}/helpful`;

//   http.put(url);

//  check(http.put(url), {
//   "status is 200": (r) => r.status === 200
//  });
// }

// export default function () {
//   let max = 3518973;
//   let min = 3167075;
//   const questionId = Math.floor(Math.random() * (max - min) + min);
//   const url = `http://localhost:8080/qa/questions/${questionId}/report`;

//   http.put(url)
// }

// export default function () {
//   let max = 1000011;
//   let min = 900000;
//   const productId = Math.floor(Math.random() * (max - min) + min);
//   const url = `http://localhost:8080/qa/questions?product_id=${productId}`;

//   let data = {
//       "asker_name": "sam",
//       "asker_email": "sam@gmail.com",
//       "reported": false,
//       "question_body": "will this work?",
//       "question_helpfulness": 0,
//       "answers": []
//     }

//   let res = http.post(url, data, {
//     headers: {'content-type': 'application/json'}
//   });
//   console.log(res)
// }

