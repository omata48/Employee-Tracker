var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "@Sitboge8848",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  let introDisplay = "=========================================\n";
  introDisplay += "|| Employee Content Management Systems ||\n";
  introDisplay += "=========================================\n";
  console.log(introDisplay);
  mainApp();
});

function mainApp() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Add to departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles",
        "Update employee manager",
        "Exit",
      ],
    })
    .then(function (response) {
      switch (response.action) {
        case "Add to departments, roles, employees":
          addTo();
          break;
        case "View departments, roles, employees":
          viewItem();
          break;
        case "Update employee roles":
          updateEmployeeRole();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "Exit":
          console.log("Good Bye!");
          connection.end();
      }
    });
}

function addTo() {
  inquirer
    .prompt([
      {
        name: "route",
        type: "list",
        message: "Add to:",
        choices: ["Departments", "Roles", "Employees"],
      },
      {
        name: "name",
        type: "input",
        message: "Department Name",
        when: function (answer) {
          return answer.route === "Departments";
        },
      },
      {
        name: "title",
        type: "input",
        message: "Role title",
        when: function (answer) {
          return answer.route === "Roles";
        },
      },
      {
        name: "salary",
        type: "number",
        message: "Salary of role",
        when: function (answer) {
          return answer.route === "Roles";
        },
      },
      {
        name: "department_id",
        type: "number",
        message: "Department ID of role",
        when: function (answer) {
          return answer.route === "Roles";
        },
      },
      {
        name: "first_name",
        type: "input",
        message: "Employee first name",
        when: function (answer) {
          return answer.route === "Employees";
        },
      },
      {
        name: "last_name",
        type: "input",
        message: "Employee last name",
        when: function (answer) {
          return answer.route === "Employees";
        },
      },
      {
        name: "role_id",
        type: "number",
        message: "Employee's role ID",
        when: function (answer) {
          return answer.route === "Employees";
        },
      },
      {
        name: "manager_id",
        type: "number",
        message: "Employee's manager_id",
        when: function (answer) {
          return answer.route === "Employees";
        },
      },
    ])
    .then((response) => {
      switch (response.route) {
        case "Departments":
          var query = "INSERT INTO department (name) VALUES (?);";
          connection.query(query, [response.name], function (err, res) {
            if (err) throw err;
            console.log("Inserted new department");
            mainApp();
          });
          break;
        case "Roles":
          var query =
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";
          connection.query(
            query,
            [response.title, response.salary, response.department_id],
            function (err, res) {
              if (err) throw err;
              console.log("Inserted new role");
              mainApp();
            }
          );
          break;
        case "Employees":
          var query =
            "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);";
          if (isNaN(response.manager_id)) {
            var managerID = null;
          } else {
            var managerID = response.manager_id;
          }
          connection.query(
            query,
            [
              response.first_name,
              response.last_name,
              response.role_id,
              managerID,
            ],
            function (err, res) {
              if (err) throw err;
              console.log("Inserted new employee");
              mainApp();
            }
          );
          break;
      }
    });
}

function viewItem() {
  inquirer
    .prompt([
      {
        name: "route",
        type: "list",
        message: "What would you like to view:",
        choices: ["Departments", "Roles", "Employees"],
      },
    ])
    .then((response) => {
      switch (response.route) {
        case "Departments":
          connection.query("SELECT * FROM department", function (err, res) {
            if (err) {
              console.log("There appears to be an error:" + err);
            }
            // console.table(res);
            console.log("ID: | Department Name:\n" + "---- ------------------");
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].id + "     " + res[i].name + "\n");
            }
            mainApp();
          });
          break;
        case "Roles":
          connection.query("SELECT * FROM role", function (err, res) {
            console.table(res);
            mainApp();
          });
          break;
        case "Employees":
          connection.query("SELECT * FROM employee", function (err, res) {
            console.table(res);
            mainApp();
          });
          break;
      }
    });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.log("There appeared to be an error: " + err);
    }
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee is being updated",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
        },
        {
          name: "role_id",
          type: "number",
          message: "What is the new role id",
        },
      ])
      .then((response) => {
        var query =
          "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
        var name = response.employee.split(" ");
        connection.query(query, [response.role_id, name[0], name[1]], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log("Updated employee role");
          mainApp();
        });
      });
  });
}

function updateEmployeeManager() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee is being updated",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              if (res[i].first_name !== null) {
                choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
              }
            }
            return choiceArray;
          },
        },
        {
          name: "manager_id",
          type: "list",
          message: "What is the new manager id",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(i + 1);
            }
            choiceArray.push("null");
            return choiceArray;
          },
        },
      ])
      .then((response) => {
        var query =
          "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?";
        var name = response.employee.split(" ");
        var managerID =
          response.manager_id === "null" ? null : response.manager_id;
        connection.query(query, [managerID, name[0], name[1]], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log("Updated employee manager!");
          mainApp();
        });
      });
  });
}
