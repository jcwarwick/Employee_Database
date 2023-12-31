INSERT INTO department (name)
VALUES
    ("Engineering"),
    ("Sales"),
    ("Onboarding"),
    ("Customer Support"),
    ("Finance");

-- Insert seed data into the 'roles' table
INSERT INTO role ( title, salary, department_id)
VALUES
    ( "Chief Technical Officer", 200000, 1),
    ( "Chief Revenue Officer", 210000, 2),
    ( "Chief Operating Officer", 170000, 3),
    ( "Chief Client Experience", 145000, 4),
    ( "Chief Financial Officer", 200000, 5);

-- Insert seed data into the 'employees' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Justin", "Schultz", 1, null),
    ("Jack", "Sanogo", 2, null),
    ("Arlin", "Lemmon", 3, 1),
    ("Juanda", "Pool", 4, 2),
    ("Jaime", "George", 5, null);