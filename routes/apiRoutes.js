const express = require('express');
const router = express.Router();
const movieController = require('../models/controllers/movieController');

/* root directory: /api/ */

// ======== CREATE ========
router.post('movies/new', movieController.addMovie);

// ======== READ ========
router.get('/movies', movieController.findAll);
router.get('/movies/:id', movieController.findById);

// ======== UPDATE ========
router.put('/movies/update', movieController.updateMovie);

// ======== DELETE ========
router.put('/movies/delete/:id', movieController.deleteById);

module.exports = router;
