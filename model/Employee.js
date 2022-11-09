const mongoose = require('mongoose');
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    }
})

//by default mongoose will set 'Employee' to plural and lowercase by default
module.exports = mongoose.model('Employee', employeeSchema)