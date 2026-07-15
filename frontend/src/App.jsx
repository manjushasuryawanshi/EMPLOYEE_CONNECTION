import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  // -----------------------------
  // Fetch Employees
  // -----------------------------

  const fetchEmployees = async () => {

    try {

      const response = await axios.get("http://localhost:7000/employees");

      setEmployees(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  // -----------------------------
  // Add Employee
  // -----------------------------

  const addEmployee = async () => {

    if (!name || !department || !salary || !email) {

      alert("⚠ Please fill all fields!");

      return;

    }

    try {

      await axios.post("http://localhost:7000/employees", {

        name,
        department,
        salary,
        email

      });

      alert("✅ Employee Added Successfully!");

      setName("");
      setDepartment("");
      setSalary("");
      setEmail("");

      fetchEmployees();

    } catch (error) {

      console.log(error);

      alert("❌ Failed to Add Employee");

    }

  };

  // -----------------------------
  // Delete Employee
  // -----------------------------

  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`http://localhost:7000/employees/${id}`);

      alert("🗑 Employee Deleted Successfully!");

      fetchEmployees();

    } catch (error) {

      console.log(error);

    }

  };

  // -----------------------------
  // Edit Employee
  // -----------------------------

  const editEmployee = (employee) => {

    setEditId(employee._id);

    setName(employee.name);

    setDepartment(employee.department);

    setSalary(employee.salary);

    setEmail(employee.email);

  };

  // -----------------------------
  // Update Employee
  // -----------------------------

  const updateEmployee = async () => {

    if (!name || !department || !salary || !email) {

      alert("⚠ Please fill all fields!");

      return;

    }

    try {

      await axios.put(

        `http://localhost:7000/employees/${editId}`,

        {

          name,
          department,
          salary,
          email

        }

      );

      alert("✅ Employee Updated Successfully!");

      setEditId(null);

      setName("");
      setDepartment("");
      setSalary("");
      setEmail("");

      fetchEmployees();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Employee Management System</h1>

      <hr />

      <h2>{editId ? "Update Employee" : "Add Employee"}</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Enter Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {
        editId ?

          <button onClick={updateEmployee}>
            Update Employee
          </button>

          :

          <button onClick={addEmployee}>
            Add Employee
          </button>

      }

      <hr />

      <h2>All Employees</h2>

      {

        employees.map((employee) => (

          <div
            key={employee._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px"
            }}
          >

            <h3>Name : {employee.name}</h3>

            <p>Department : {employee.department}</p>

            <p>Salary : ₹ {employee.salary}</p>

            <p>Email : {employee.email}</p>

            <button onClick={() => editEmployee(employee)}>
              Edit
            </button>

            &nbsp;&nbsp;

            <button onClick={() => deleteEmployee(employee._id)}>
              Delete
            </button>

          </div>

        ))

      }

    </div>

  );

}

export default App;