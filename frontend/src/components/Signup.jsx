import { useEffect, useState } from "react";
import "./styles.css"
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { backend_server } from '../constants';

const Signup = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 0.5 } });
    }, [controls]);


    const [name, Setname] = useState("");
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
    const [role, Setrole] = useState("");
    const [canlogin, Setlogin] = useState(false)

    const onsubmit = (event) => {
        event.preventDefault();
        if (role.toLocaleLowerCase().trim() === "user" || role.toLocaleLowerCase().trim() === "consultant") {


            axios.post(backend_server + "signup", {
                name: name.toLowerCase().trim(),
                email: email,
                password: password.trim(),
                role: role.toLowerCase().trim(),
            }).then((response) => {
                if (response.data === "registered") {
                    Setlogin(true);
                }
            }).catch((e) => console.log(e));
        }
        else{
            alert("enter a valid role");
        }
    }
    if (canlogin) {
        return <Navigate to="/" />
    }
    return (
        <div class="container">
            <div class="signin-signup">
                <form onSubmit={onsubmit}>
                    <h2 class="title">Sign up</h2>
                    <motion.div class="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Username" name="name1" onChange={(e) => { Setname(e.target.value) }} required />
                    </motion.div>
                    <motion.div class="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" name="email" onChange={(e) => { Setemail(e.target.value) }} required />
                    </motion.div>
                    <motion.div class="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: -500 }}>
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" name="password1" onChange={(e) => { Setpassword(e.target.value) }} required />
                    </motion.div>
                    <motion.div class="input-field" whileHover={{ scale: 1.5 }} animate={controls} initial={{ x: 500 }}>
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Role(user/consultant)" name="role" onChange={(e) => { Setrole(e.target.value) }} required />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.5 }} animate={controls} initial={{ y: 500 }}><input type="submit" value="Sign up" class="btn" /></motion.div>
                    <p style={{ color: "white" }}>Already have an account? <Link to="/" className="link" style={{ cursor: 'pointer' }}>Sign in</Link></p>
                </form>
            </div>
        </div>
    );
}
export default Signup;