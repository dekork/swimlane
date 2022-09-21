-- This SQL file initializes the database on an empty server.
CREATE DATABASE IF NOT EXISTS swimlane;
USE swimlane;
CREATE TABLE IF NOT EXISTS boats (
id INT AUTO_INCREMENT PRIMARY KEY,
vessel_name VARCHAR(100) NOT NULL UNIQUE,
operator_name VARCHAR(100),
swimlane TINYINT);

-- If changes are needed to be made, you will need to add alter statements below,
--  but keep the above same so that changes will propagate correctly to
--  an existing server that already contains the database and tables!