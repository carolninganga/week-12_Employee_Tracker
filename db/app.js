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
    connection.end();
  });


//   function start() {
//       inquirer
//       .prompt({
          
//       })
//   }