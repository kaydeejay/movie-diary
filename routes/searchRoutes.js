const express = require('express');
const router = express.Router();
const axios = require('axios');

router.put('/', (req, res) => {
  const { url, search } = req.body;
  axios.get(url + process.env.OMDB_KEY + search)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => console.log(err));
});

module.exports = router;