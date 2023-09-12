const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const constants = require('./src/constants');
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' }, (err) => {
    if (err) {
        console.error('Error loading environment variables:', err);
    } else {
        console.log("Environment variables loaded successfully.");
    }
});
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser());
module.exports = app;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: constants.mail_from,
        pass: constants.mail_password,
    }
});

var usermail;
const mailOptions = {
    from: constants.mail_from,
    to: usermail,
    subject: constants.subject,
    text: constants.text,
};

const db = mysql.createConnection({
    user: constants.user,
    host: constants.host,
    password: constants.password,
    database: constants.database,
});

app.get("/user", (req, res) => {
    db.query(
        "SELECT members.name, availabletimes.availabledate, availabletimes.email, GROUP_CONCAT(CONCAT(availabletimes.starttime, '-', availabletimes.endtime)) AS time_range " +
        "FROM members " +
        "INNER JOIN availabletimes ON members.email = availabletimes.email " +
        "GROUP BY members.name, availabletimes.availabledate, availabletimes.email",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email.trim();
    db.query("SELECT * FROM members WHERE name=? and password=? and email=?", [name, password, email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while authenticating user");
        } else {
            if (result.length > 0) {
                const user = result[0];
                const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });

                res.status(200).json({ user: user, token: token });
            } else {
                res.status(401).json({ message: "Authentication failed: Invalid credentials" });
            }
        }
    });
});



app.post("/signup", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;
    db.query("INSERT INTO members (name, email, password, role) VALUES(?,?,?,?)", [name, email, password, role], (err, result) => {
        if (err) console.log(err);
        else {
            res.status(200).send("registered");
        }
    });
})

app.post("/availabletime", (req, res) => {
    const availabletimestart = req.body.availabletimestart;
    const availabletimeend = req.body.availabletimeend;
    const availabledate = req.body.availabledate;
    const email = req.body.email;
    db.query("INSERT INTO availabletimes(email,starttime,endtime,availabledate) VALUES(?,?,?,?)", [email, availabletimestart, availabletimeend, availabledate]);
    res.send("updated");
})
app.post("/breaktime", (req, res) => {
    const breaktimestart = req.body.breaktimestart;
    const breaktimeend = req.body.breaktimeend;
    const breakdate = req.body.breakdate;
    const email = req.body.email;
    db.query("INSERT INTO breaktimes(email,starttime,endtime,breakdate) VALUES(?,?,?,?)", [email, breaktimestart, breaktimeend, breakdate]);
    res.send("updated");
})

app.post("/leave", (req, res) => {
    const leavedate = req.body.leavedate;
    const email = req.body.email;
    db.query("INSERT INTO leavedates(email,leavedate) VALUES(?,?)", [email, leavedate]);
    res.send("updated");
})

app.post('/appointments', (req, res) => {
    db.query("SELECT * FROM appointments WHERE dremail=?", [req.body.dremail], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
})

app.post('/book', (req, res) => {
    var username;
    const starttime = req.body.starttime;
    const endtime = req.body.endtime;
    const date = req.body.date;
    const dremail = req.body.dremail;
    usermail = req.body.usermail;
    db.query("SELECT name FROM members WHERE email=?", [req.body.usermail], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while fetching user data");
        } else {
            username = result[0] ? result[0].name : null;
            if (username != null) {
                db.query("INSERT INTO appointments(starttime, endtime, date, username, dremail) VALUES (?, ?, ?, ?, ?)", [starttime, endtime, date, username, dremail], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error while booking appointment");
                    } else {
                        db.query("DELETE FROM availabletimes WHERE email=? and starttime=? and endtime=? and availabledate=?", [dremail, starttime, endtime, date]);
                        mailOptions.to = usermail;
                        mailOptions.text=mailOptions.text+starttime+"-"+endtime+" on "+date;
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res.send('Error sending email');
                            } else {
                                res.send('Email sent successfully');
                            }
                        });
                        res.send("booked");
                    }
                });
            } else {
                console.log("User not found");
                res.status(404).send("User not found");
            }
        }
    })
})

app.listen(8000, () => {
    console.log("started");
})