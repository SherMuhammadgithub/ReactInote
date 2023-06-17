const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inote-book"
const connectTomongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      // Connection successful
      console.log('connected to mongo succefully');
    })


}
module.exports = connectTomongo;