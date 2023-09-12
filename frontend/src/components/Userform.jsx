import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backend_server } from '../constants';


function Userform() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usermail } = useParams();

  useEffect(() => {
    axios.get(backend_server + 'user')
      .then(response => {
        setLoading(false)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('jwtoken') !== null;
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, []);


  const Handlebooking = (time, dremail, date) => {
    const starttime = time.split("-")[0];
    const endtime = time.split("-")[1];

    axios.post(backend_server + "book", {
      starttime: starttime,
      endtime: endtime,
      date: date,
      usermail: usermail,
      dremail: dremail,
    }).then((response) => {
      if (response.data === "booked") {
        alert("booked");
        window.location.reload();
      }
    }).catch(err => console.log(err));
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <thead className='th'>
            <tr>
              <th className='td'>Name</th>
              <th className='td'>Available time</th>
            </tr>
          </thead>

          <tbody style={{ color: 'yellow' }}>
            {data.map((item, index) => (
              <tr key={index} style={{ color: 'yellow' }}>
                <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                <td>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {item.time_range.split(',').map((timeRange, index1) => (
                      <li key={index1}>
                        {timeRange + "  on  " + item.availabledate}
                        <button
                          type='submit'
                          className='btn'
                          value={timeRange}
                          onClick={(e) => {
                            Handlebooking(e.target.value, item.email, item.availabledate);
                          }}
                        >
                          Book
                        </button>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Userform;
