//DEPENDENCIES
const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require('console.table');

//Connecting to database
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ADftw",
    database: "emp_db"
  });

  db.connect(function(err) {
    if (err) throw err
    console.log("Connected to emp_db")
    startPrompts();
});

//function to prompt the user for actions 

function startPrompts() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees", 
              "View All Employees by Role",
              "View All Employees By Department", 
              "Update Employee",
              "Add Employee",
              "Add Role",
              "Add Department"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees":
              viewAllEmployees();
            break;
    
          case "View All Employees by Role":
              viewAllByRole();
            break;

          case "View All Employees By Department":
              viewAllDepartments();
            break;

          case "Update Employee":
          updateEmployee();
          break;
          
          case "Add Employee":
                addEmployee();
              break;
      
          case "Add Role":
              addRole();
            break;
    
          case "Add Department":
              addDepartment();
            break;
    
            }
    })
}

//function to view all employees
function viewAllEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompts()
  })
}

//function to view all emps by roles
function viewAllByRole() {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompts()
    })
  }

//function to view all departments
function viewAllDepartments() {
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompts()
    })
  }

//function to put roles as option for the add employee prompt
var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

//function to list out possible managers for the add employee prompt
var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

//function to add an employee
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter first name: "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter last name: "
        },
        {
          name: "role",
          type: "list",
          message: "Enter role: ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Enter manager name:",
            choices: selectManager()
        }
    ]).then(function (val) {
      // console.log(val);
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      db.query("INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)", [val.firstname, val.lastname, managerId, roleId], function(err){
          if (err) throw err
          console.table(val)
          startPrompts()
      })
      // console.log(thequery);

  })
}

//function to update emp record
function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "Enter employee last name: ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "Enter employee's new title: ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        db.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompts()
        })
  
    });
  });

  }

// function to add role
function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "Enter Role:"
        },
        {
          name: "Salary",
          type: "input",
          message: "Enter Salary:"

        } 
    ]).then(function(res) {
        db.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompts();
            }
        )

    });
  });
  }

//function to add department 
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "Enter dept to add:"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompts();
            }
        )
    })
  }

  