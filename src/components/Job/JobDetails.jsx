import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../../index.js";
import axios from "axios";
import { url } from "../../Api.jsx";


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const NavigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${url}/job/getsinglejob/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err.response.data.json);
      });
  }, [id]);
  if (!isAuthorized) {
    NavigateTo("/login");
  }
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="jobDetail Page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title:<span>{job.title}</span>
          </p>
          <p>
            Category:<span>{job.category}</span>
          </p>
          <p>
            Campany:<span>{job.country}</span>
          </p>
          <p>
            City:<span>{job.city}</span>
          </p>
          <p>
            Location:<span>{job.location}</span>
          </p>
          <p>
            Description:<span>{job.description}</span>
          </p>
          <p>
            Job Posted On :<span>{formatDate(job.JobPosted)}</span>
          </p>
          <p>
            Salary :
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom}-{job.salaryTo}
              </span>
            )}
          </p>
          <p>
            {user && user.role === "Employer" ? (
              <></>
            ) : (
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
