import React from 'react';

function JobTable({ jobs }) {
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Employer Name</th>
          <th>City</th>
          <th>Country</th>
          <th>Job Portal</th>
          <th>Date Posted</th>
          <th>Application Link</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={index}>
            <td>{job.job_title || 'N/A'}</td>
            <td>{job.employer_name || 'N/A'}</td>
            <td>{job.job_city || 'N/A'}</td>
            <td>{job.job_country || 'N/A'}</td>
            <td>{job.job_publisher || 'N/A'}</td>
            <td>{job.job_posted_at_datetime_utc || 'N/A'}</td>
            <td>
              {job.job_apply_link ? (
                <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
              ) : (
                'No link available'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobTable;
