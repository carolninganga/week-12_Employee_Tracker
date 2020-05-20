var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tanya#007",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
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
          UpdateEmployee();
          
      }
    })
  }
function employeeView() {
  var query = "SELECT first_name, last_name, tile, salary FROM employee ";
  query += "LEFT JOIN role";
  query += "ON employee.role_id = role.id"
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.table(result)
    start();
  });
};

function departmentView() {
  var query = "SELECT * from department";
  connection.query(query, function(err, result) {
    console.table(result)
    start();
  });
};

function roleView() {
  var query = "SELECT * from role";
  connection.query(query, function(err, result){
    console.table("View Roles :" + result);
    start();
  });
};

function UpdateEmployee() {
  connection.query("SELECT * FROM role", function(err, result) {

    inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter Employee's first_name:",
      },
      {
        name: "last_name",
        type: "input",
        message:"Enter Emplyoyee's last_name",
      },
      {
        name: "role",
        type:"list",
        choices: function() {
          var arr = [];
          for(var i = 0; i < result.length; i++) {
            arr.push(res[i].title);
          }
          return arr;
        },
        message: "What is the role ?"
        
      }])
      .then(function(answer){
        let employeeRoleID;
        for(let j = 0; j < result.length; j++) {
          if(result[j].title === answer.role) {
            employeeRoleID = result[j].id;
            console.log(employeeRoleID);
          }
        }

        connection.query(
          "INSERT INTO employee SET ?", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.employeeRoleID,
          })
      });
  });
};
  function exitApp(){
    connection.end();
  }

  // * Add departments, roles, employees

  // * View departments, roles, employees

  // * Update employee roles

//   function start() {
//       inquirer
//       .prompt({
          
//       })
//   }