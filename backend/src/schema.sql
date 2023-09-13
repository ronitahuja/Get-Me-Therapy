CREATE DATABASE IF NOT EXISTS getmetherapy;

USE getmetherapy;

CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS availabletimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    starttime VARCHAR(10),
    endtime VARCHAR(10),
    availabledate VARCHAR(20)
);

CREATE TABLE appointments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dremail VARCHAR(255),
    username VARCHAR(50),
    starttime VARCHAR(10),
    endtime VARCHAR(10),
    date VARCHAR(20)
);

CREATE TABLE breaktimes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255), 
    starttime VARCHAR(10),
    endtime VARCHAR(10),
    breakdate VARCHAR(20)
);

CREATE TABLE leavedates(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(100),
    leavedate VARCHAR(20)
);

