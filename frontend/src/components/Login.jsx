import { useState, useEffect } from "react";
import "./styles.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { backend_server } from '../constants';

const Login = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 0.5 } });
    }, [controls]);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('jwtoken') !== null;
        if (isAuthenticated) {
            setAuthenticated(true);
        }
    }, []);

    const onsubmit = (event) => {
        event.preventDefault();
        axios.post(backend_server, {
            name: name,
            password: password,
            email: email,
        })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('jwtoken', response.data.token);

                    if (response.data.user.role === "consultant" || response.data.user.role === "user") {
                        setRedirect(response.data.user.role);
                        setAuthenticated(true);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (authenticated) {
        if (redirect === "consultant") {
            return <Navigate to={`/consultant/${email}`} />;
        } else if (redirect === "user") {
            return <Navigate to={`/user/${email}`} />;
        }
    }

    return (
        <div className="container">
            <div className="signin-signup">
                <form onSubmit={onsubmit}>
                    <h2 className="title">Sign in</h2>
                    <motion.div className="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username" name="name" onChange={(e) => { setName(e.target.value) }} required />
                    </motion.div>
                    <motion.div className="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
                        <i className="fas fa-user"></i>
                        <input type="email" placeholder="Email" name="name" onChange={(e) => { setEmail(e.target.value) }} required />
                    </motion.div>
                    <motion.div className="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ y: 500 }}><input type="submit" value="Login" className="btn" /></motion.div>
                    <p style={{ color: "white" }}>Don't have an account? <Link to="/signup" className="link" style={{ cursor: 'pointer' }}>Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
