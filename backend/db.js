const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
    
]);
const connectDB = async () => {
    try {
        await mongoose.connect(
  "mongodb+srv://manjushasuryawanshi245_db_user:fNLgC6eDiekuPFRX@admin.3xytmgt.mongodb.net/EmployeeDB?retryWrites=true&w=majority&appName=admin"
);

console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Database connection Error");
        console.log(error);
    }
};

module.exports = connectDB;

