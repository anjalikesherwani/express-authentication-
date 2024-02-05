mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/student").then(()=>
console.log("Connected to MongoDB")
).catch((err)=> console.error(err));

schema= mongoose.Schema({
    username:String,
    password:String,
})

StudentModel = mongoose.model('student',schema)

module.exports = StudentModel