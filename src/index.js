const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
  // Call the function to start your application logic here
  init();
});

// Function to display main menu and handle user choices
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(answer => {
      switch (answer.choice) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end(); // Close the database connection
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to view all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
      }
    ])
    .then(answer => {
      connection.query('INSERT INTO department SET ?', { name: answer.name }, err => {
        if (err) throw err;
        console.log('Department added successfully!');
        mainMenu();
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to add a role
function addRole() {
  // Implement logic to add a role
  // Similar to addDepartment, prompt user for role details and execute SQL query to insert data
}

// Function to add an employee
function addEmployee() {
  // Implement logic to add an employee
  // Prompt user for employee details and execute SQL query to insert data
}

// Function to update an employee role
function updateEmployeeRole() {
  // Implement logic to update an employee role
  // Prompt user for employee and new role details and execute SQL query to update data
}

// Initialize the application
function init() {
  console.log('Welcome to your employee management system!');
  mainMenu();
}
