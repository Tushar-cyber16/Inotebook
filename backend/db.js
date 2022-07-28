const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const mongoURI = "mongodb+srv://tushar:poiuytrewq@cluster0.ycikpe4.mongodb.net/Inotebook?retryWrites=true&w=majority";
const connectToMongo= () => {
    mongoose.connect(mongoURI, () => {
        console.log("connect to mongo successfully");
    })
}
module.exports = connectToMongo;