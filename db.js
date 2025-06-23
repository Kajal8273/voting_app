const mongoose = require('mongoose');
require('dotenv').config();


// Create connection with local Mongodb URL-------
  
//const mongoURL = 'mongodb://127.0.0.1:27017/hotels'  //  const mongoURL = process.env.MONGODB_URL_LOCAL 
 
// conecetd with global/hosting online db connection
 //const mongoURL=process.env.MONGODB_URL;
const mongoURL =process.env.MONGODB_URL_LOCAL

//setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// Connection object
const db = mongoose.connection;

// Define listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
