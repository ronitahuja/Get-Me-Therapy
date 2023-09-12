import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles.css';
import { backend_server } from '../constants';

const Appointments = () => {
    const { email } = useParams();
    const [data, Setappointments] = useState([]);

    useEffect(() => {
        axios.post(backend_server + "appointments", {
            dremail: email,
        }).then(response => {
            Setappointments(response.data);
        });
    }, [email]);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('jwtoken') !== null;
        if (!isAuthenticated) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead className='th'>
                    <tr>
                        <th className='td'>Patient name</th>
                        <th className='td'>Appointment Time</th>
                        <th className='td'>Appointment Date</th>
                    </tr>
                </thead>
                <tbody style={{ color: 'yellow' }}>
                    {data.map((item, index) => (
                        <tr key={index} style={{ color: 'yellow' }}>
                            <td>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</td>
                            <td>{item.starttime + "-" + item.endtime}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Appointments;
