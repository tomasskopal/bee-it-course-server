const express = require('express');
const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  const { userName, password } = req.body;
  if (userName && password) {
    res
      .status(200)
      .json(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfNTlkMjUxOGMzNDA4MWE1YjZiNTIy',
      );
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports.loginRouter = loginRouter;
