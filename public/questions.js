module.exports = {
  addToQuestions: [
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
  ],
};
