DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- creating test department 
INSERT INTO department (name)
VALUES ("Sales");

-- creating test role
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 123.12, 1);

-- creating test employee
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Bob","Builder",1);

SELECT * FROM department;

-- INNER JOIN reffering to values
SELECT name"Department", title"Title", first_name"First Name", last_name"Last Name", salary"Salary"
FROM employee 
INNER JOIN role ON role_id = role.id
INNER JOIN department ON role.department_id = department.id

UPDATE employee
SET role_id = ?
WHERE CustomerID = ?;