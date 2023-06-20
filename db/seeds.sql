-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bill", "Nye", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Barbie", "Dahl", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dusty", "Kaur", null,3 );
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Alah", "Gater", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dee", "Zaster", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Justin", "Case", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Anita", "Bath", 2, 7);
