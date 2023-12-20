USE employee_db;

-- Create department table
CREATE TABLE IF NOT EXISTS department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);
-- Create role table
CREATE TABLE IF NOT EXISTS role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);