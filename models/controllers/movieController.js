const Movie = require('../models/Movie');

module.exports = {
  // ======== CREATE ========
  addMovie: (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ success: false, error: 'No movie provided' });
    }
    const movie = new Movie(body);
    if (!movie) {
      return res.status(400).json({ success: false, error: err });
    }
    movie.save()
      .then((result) => {
        return res.status(201).json({
          success: true,
          id: movie._id,
          message: 'Successfully added movie'
        })
      })
      .catch(err => {
        return res.status(400).json({
          err,
          message: 'Failed to add movie'
        });
      });
  },
  // ======== READ: ========
  findAll: async (req, res) => {
    await Movie.find({}).sort({ createdAt: 1 }).exec((err, movies) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!movies.length) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: movies });
    });
  },

  // switch "posts" to "movies"!

  findById: async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found!' });
      }
      return res.status(200).json({ success: true, data: post });
    })
      .catch(err => console.log(err));
  },
  // ======== UPDATE: ========
  updatePost: async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: "You must provide a post to update" });
    }
    await Post.findOneAndUpdate(
      { _id: body._id },
      {
        postType: body.postType,
        title: body.title,
        body: body.body,
        responses: body.responses,
        updatedAt: Date.now()
      },
      // passing { new: true } assures that the function will return
      // the NEW document and not the old one.
      { new: true }
    )
      .then(update => {
        return res.json({ success: true, post: update });
      });
  },
  // ======== DELETE ========
  deleteById: async (req, res) => {
    await Post.findByIdAndDelete(
      { _id: req.params.id },
    )
      .then(result => res.json({ success: true, deleted: result.title }));
  }
}