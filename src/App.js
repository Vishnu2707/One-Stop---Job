import React, { useState } from 'react';
import axios from 'axios';
import JobTable from './JobTable';
import './App.css'; // Ensure this is imported to apply styles

function App() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState({
    jobTitle: '',
    location: '',
    radius: 100  // Assuming radius is constant; you can also make this dynamic if required
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchJobs = async () => {
    const { jobTitle, location, radius } = query;
    try {
      const response = await axios.get(`http://localhost:5001/api/jobs`, {
        params: { jobTitle, location, radius }
      });
      console.log("API Response:", response.data);  // Log full response to debug
      if (response.data && response.data.data) {
        setJobs(response.data.data);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs', error);
      setJobs([]);  // Ensure jobs is reset to an empty array on error
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">One Stop</div>
      </nav>

      <div className="container">
        <h1>Job Search</h1>
        <div className="search-box">
          <input
            type="text"
            name="jobTitle"
            value={query.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter Job Title"
            className="input-field"
          />
          <input
            type="text"
            name="location"
            value={query.location}
            onChange={handleInputChange}
            placeholder="Enter Location"
            className="input-field"
          />
          <button onClick={fetchJobs} className="search-button">Fetch Jobs</button>
        </div>
        
        <div className="card">
          <JobTable jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

export default App;
