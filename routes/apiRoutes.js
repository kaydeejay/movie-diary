var express = require('express');
var router = express.Router();

/* root directory: /api/ */
router.get('/', function(req, res, next) {
  res.json({ success: true, message: 'success!' });
});

module.exports = router;
