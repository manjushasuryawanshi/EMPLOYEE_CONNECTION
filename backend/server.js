const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");
const connectDB = require("./db");
const Employee = require("./models/employees");

connectDB();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("Server Started");
});

// GET
app.get("/employees", async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

// POST
app.post("/employees", async (req, res) => {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
});

app.put("/employees/:id", async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(employee);
});

// DELETE Employee
app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.json({
    message: "Employee Deleted Successfully",
  });
});
