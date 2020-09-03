var mysql = require("mysql");
const inquirer = require("inquirer");
const actions = require("./public/actions");

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
          actions.addTo();
          break;
        case "View departments, roles, employees":
          actions.viewItem();
          break;
        case "Update employee roles":
          actions.updateEmployeeRole();
          break;
        case "Update employee manager":
          actions.updateEmployeeManager();
          break;
        case "Exit":
          console.log("Good Bye!");
          connection.end();
        // no default
      }
    });
}
