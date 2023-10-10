
const mongoose = require('mongoose');

// Connect to the database
// mongoose.connect('mongodb://127.0.0.1:27017/dealer_pro', {
    mongoose.connect('mongodb+srv://harveyfc3:JosMarie1!@dpcluster1.quxevou.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log
        ('Something went wrong when connecting to the database ', err));