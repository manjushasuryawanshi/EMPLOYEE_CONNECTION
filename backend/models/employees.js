mongoose = require ("mongoose");
 const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    salary: Number,
    email: String

});
const Employees = mongoose.model("Employees",employeeSchema);//it can save file update delete
module.exports =  Employees;