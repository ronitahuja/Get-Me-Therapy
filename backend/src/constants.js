// i am using nodemailer to send mail to users
module.exports = {
    user: "root",//mysql database user
    host: "localhost",//host of mysql database
    password: "ronitahuja192003",//password of mysql database
    database: "getmetherapy",//name of mysql database

    mail_from:"basicelecticalengineering@gmail.com",//replace with company email-id to send confirmation mail after booking(even this emailid works)
    subject:"Get Me Therapy confirmation mail",//subject of the mail to be sent
    text:"Hello, your appointment have been successfully booked at Get Me Therapy, from ", //content of email
    mail_password:"wmydradputactwdj",/*this is the app password
     generated from senders google account after turning on 2-step verification. This allows nodemailer to send mail from this account*/
};

/*
The Mysql database used should contain tables:

    ->appointments, query used to create is
    CREATE TABLE appointments(id INT AUTO_INCREMENT PRIMARY KEY, dremail VARCHAR(100),username VARCHAR(50), starttime VARCHAR(10),endtime VARCHAR(10),date VARCHAR(20));

    ->breaktimes, query used to create is
    CREATE TABLE breaktimes(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100), starttime VARCHAR(10),endtime VARCHAR(10),breakdate VARCHAR(20));
    
    ->leavedates, query used to create is
    CREATE TABLE leavedates(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100),leavedate VARCHAR(20));
    
    ->availabletimes, query used to create is
    CREATE TABLE availabletimes(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100), starttime VARCHAR(10),endtime VARCHAR(10),availabledate VARCHAR(20));

    ->members, query used to create is
    CREATE TABLE members(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), password VARCHAR(50), role VARCHAR(15), email VARCHAR(100));
*/