import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const API = import.meta.env.VITE_API_URL;

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !category || !country || !city || !location) {
      return toast.error("Please fill in all fields");
    }

    if (salaryType === "default") {
      return toast.error("Please select a salary type");
    }

    const jobData =
      salaryType === "Fixed Salary"
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };

    try {
      const { data } = await axios.post(`${API}/job/post`, jobData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(data.message);

      // Reset fields
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setFixedSalary("");
      setSalaryFrom("");
      setSalaryTo("");
      setSalaryType("default");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Job creation failed");
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN STACK Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN STACK Development</option>
              <option value="MEVN Stack Development">MEVN STACK Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>

          <div className="wrapper">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />

          <div className="salary_wrapper">
            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            <div>
              {salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                />
              ) : salaryType === "Ranged Salary" ? (
                <div className="ranged_salary">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  />
                </div>
              ) : (
                <p>Please select a valid salary type.</p>
              )}
            </div>
          </div>

          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
          />

          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
