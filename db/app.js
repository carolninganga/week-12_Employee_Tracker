var mysql = require("mysql");
//var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tanya#007",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    StartRun();
    //connection.end();
  });

  const viewOptions = [
    "ViewEmployees",
    "ViewDepartment",
    "ViewRoles",
    "UpdateEmployee",
    "exit"
  ];

  const UpdateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "exit"
  ]

  // const CreateDepartmentOption = [
  //   ["name"]
  // ]

  function start() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: viewOptions
    })
    .then(function(answer) {
      switch(answer.action){
        case viewOptions[0]:
          employeeView();
          break;

        case viewOptions[1]:
          departmentView();
          break;

        case viewOptions[3]:
          roleView();
          break;

        case UpdateOptions[4]:
          connection.end();
      }
    })
  }


  // * Add departments, roles, employees

  // * View departments, roles, employees

  // * Update employee roles

//   function start() {
//       inquirer
//       .prompt({
          
//       })
//   }