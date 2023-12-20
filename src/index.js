const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
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
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the role title:'
            },
            {
              type: 'number',
              name: 'salary',
              message: 'Enter the role salary:'
            },
            {
              type: 'number',
              name: 'department_id',
              message: 'Enter the department ID for this role:'
            }
          ])
          .then(answer => {
            connection.query(
              'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
              [answer.title, answer.salary, answer.department_id],
              err => {
                if (err) throw err;
                console.log('Role added successfully!');
                mainMenu();
              }
            );
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }


// Function to add an employee
function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the employee\'s first name:'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the employee\'s last name:'
        },
        {
          type: 'number',
          name: 'role_id',
          message: 'Enter the role ID for this employee:'
        },
        {
          type: 'number',
          name: 'manager_id',
          message: 'Enter the manager\'s ID for this employee (if none, leave blank):'
        }
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.first_name, answer.last_name, answer.role_id, answer.manager_id || null],
          err => {
            if (err) throw err;
            console.log('Employee added successfully!');
            mainMenu();
          }
        );
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  

// Function to update an employee role
function updateEmployeeRole() {
    // Fetching employee IDs and roles from the database to display choices to the user
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, employees) => {
      if (err) throw err;
  
      connection.query('SELECT id, title FROM role', (err, roles) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee_id',
              message: 'Select the employee to update:',
              choices: employees.map(employee => ({ name: employee.full_name, value: employee.id }))
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Select the new role for the employee:',
              choices: roles.map(role => ({ name: role.title, value: role.id }))
            }
          ])
          .then(answer => {
            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ?',
              [answer.role_id, answer.employee_id],
              err => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                mainMenu();
              }
            );
          })
          .catch(error => {
            console.log('Error:', error);
          });
      });
    });
  }
  

// Initialize the application
function init() {
  console.log('Welcome to your employee management system!');
  mainMenu();
}
