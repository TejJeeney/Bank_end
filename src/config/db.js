const mongoose = require('mongoose')

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        if(err.message){
            console.error('Error encountered while connecting to the DB', err.message);
        }
        else{
            console.error('Error encountered while connecting to the DB', err);
        }
        process.exit(1) // Exit the process with a failure code
    })
}

module.exports = connectToDB

