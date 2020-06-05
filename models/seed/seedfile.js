var mongoose = require('mongoose');

require('../all-models').toContext(global);

Movie.create([
   {
     title: 'The Princess Bride',
     release: 1987-10-09,
     poster: 'https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg',
     directors: 'Rob Reiner',
     writers: 'William Goldman (screenplay by), William Goldman (based upon his book)',
     cast: 'Cary Elwes, Mandy Patinkin, Chris Sarandon, Christopher Guest',
     metascore: 77,
     seen: true
   }
 ])

 .then(() => {
   console.log("Seed complete!")  
   mongoose.connection.close();
 });