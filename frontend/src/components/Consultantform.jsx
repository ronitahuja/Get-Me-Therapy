import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import axios from 'axios';
import { backend_server } from '../constants';
const Consultantform = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 0.5 } });
  }, [controls]);
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('jwtoken') !== null;
    if (!isAuthenticated) {
      window.location.href="/";
    }
  }, []);


  const [availabletimestart, Setavailabletimestart] = useState("");
  const [availabletimeend, Setavailabletimeend] = useState("");
  const [availabledate, Setavailabledate] = useState('');

  const [breaktimestart, Setbreaktimestart] = useState("");
  const [breaktimeend, Setbreaktimeend] = useState("");
  const [breakdate, Setbreakdate] = useState("");

  const [leavedate, Setleavedate] = useState("");



  const { email } = useParams();

  const handleTaskSubmit = () => {
    if (availabletimestart === "" && availabletimeend === "" && availabledate === "") { }
    else {
      axios.post(backend_server+"availabletime", {
        availabletimestart: availabletimestart,
        availabletimeend: availabletimeend,
        availabledate: availabledate,
        email: email
      }).then((response) => {
        if (response.data === "updated") alert("updated");
      }).catch(err => console.log(err));
    }

    if (breaktimestart === "" && breaktimeend === "" && breakdate === "") { }
    else {
      axios.post(backend_server+"breaktime", {
        breaktimestart: breaktimestart,
        breaktimeend: breaktimeend,
        breakdate: breakdate,
        email: email
      }).then((response) => {
        if (response.data === "updated") alert("updated");
      }).catch(err => console.log(err));
    }

    if (leavedate === "") { }
    else {
      axios.post(backend_server+"leave", {
        leavedate: leavedate,
        email: email,
      }).then((response) => {
        if (response.data === "updated") alert("updated");
      }).catch(err => console.log(err));
    }
  };

  return (
    <div className="consultantcontainer">

      <div>
        <h1 className="consultanttitle">Consultant Form</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 className="subtitle">Select available hours</h2>
          <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
            <input className="consultant-time"
              onChange={(e) => Setavailabletimestart(e.target.value)}
              type='time'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
            <input className="consultant-time"
              onChange={(e) => Setavailabletimeend(e.target.value)}
              type='time'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
            <input type='date' className="calenderbutton" onChange={(e) => Setavailabledate(e.target.value)} />
          </motion.div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="subtitle">Select break hours</h2>
            <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
              <input className="consultant-time"
                onChange={(e) => Setbreaktimestart(e.target.value)}
                type='time'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
              <input className="consultant-time"
                onChange={(e) => Setbreaktimeend(e.target.value)}
                type='time'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
              <input type='date' className="calenderbutton" onChange={(e) => Setbreakdate(e.target.value)} />
            </motion.div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="subtitle">Select leave days</h2>
            <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ y: 500 }}>
              <input type='date' className="calenderbutton" onChange={(e) => Setleavedate(e.target.value)} />
            </motion.div>
          </div>
        </div>
        <motion.button className="btn" onClick={handleTaskSubmit} whileHover={{ scale: 1.5 }} animate={controls} initial={{ y: -100 }}>Update</motion.button>
        <motion.button className="btn" style={{ display: 'block', marginLeft: '30%', background: 'blue', width: '50%' }} whileHover={{ scale: 1.5 }} animate={controls} initial={{ y: -100 }} onClick={() => {
          window.location.href = '/appointments/' + email;
        }}>Check appointments</motion.button>
      </div>
    </div>
  );
};

export default Consultantform;
