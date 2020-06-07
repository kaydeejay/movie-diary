const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('./connection-string');

if (mongoose.connection.readyState === 0) {
  mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}


const newSchema = new Schema({
  
  'title': { type: String },
  'release': { type: Date },
  'poster': { type: String },
  'directors': { type: String },
  'writers': { type: String },
  'cast': { type: String },
  'metascore': { type: Number },
  'seen': { type: Boolean },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Movie', newSchema);
