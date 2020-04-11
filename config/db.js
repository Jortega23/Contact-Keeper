const mongoose = require('mongoose');
const config = require('config');
const db= config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            userNewUrlParser: true,
            useCreatIndex: true,
            useFindAndModify: false
        });

        console.log('MOngoDB conncected')

    }catch (err){

        console.log(err.message);
        process.exit(1);


    }
}


module.exports = connectDB;