// import axios from "axios";

// const dummyapi = axios.create({
//   baseURL: "https://dummyapi.io/data/v1/",
//   timeout: 10000,
//   headers: { "app-id": process.env.REACT_APP_API_KEY },
// });

// export { dummyapi };

import axios from "axios";

const dummyapi = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 10000,
});

export { dummyapi };
