const mongoose = require('mongoose'); // require the library
mongoose.connect('mongodb://localhost/hospital_api_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // to connect to database

const db = mongoose.connection; // aquire the connection to check if it is successful
db.on('error', console.error.bind(console, 'error connecting to db')); // if error in connection
// db.once('open', function(){
//     console.log('Successfully connected to db');
// }); // once coonection is open