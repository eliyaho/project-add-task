const mongoose = require('mongoose');
function connectMongo() {
  const uri = 'mongodb://localhost:27017/mydatabase';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose.connect(uri, options);
}

module.exports = connectMongo;
