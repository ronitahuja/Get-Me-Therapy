import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./styles.css";
import Consultantform from "./Consultantform";
import Userform from "./Userform";
import Appointments from "./Appointments";
import Pagenotfound from "./Pagenotfound";

const Home=()=>{
    return(
        <div>
            <BrowserRouter> 
             <Routes>
                 <Route path="/" element={<Login/>}/>
                 <Route path="/signup" element={<Signup/>}/>
                 <Route path="/consultant/:email" element={<Consultantform/>}/>
                 <Route path="/user/:usermail" element={<Userform/>}/>
                 <Route path="/appointments/:email?" element={<Appointments/>}/>
                 <Route path="*" element={<Pagenotfound/>}/>
             </Routes>
             </BrowserRouter>
        </div>
    );
}
export default Home;