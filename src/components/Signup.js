import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
  let history = useHistory();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const OnChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createUser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    // Redirect to Home Page
    localStorage.setItem("token", json.token);
    history.push("/");
  };
  return (
      <div className="container mt-3">
          <h2>Create an account to continue using MySecrets</h2>
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={OnChange}
            id="name"
            value={credentials.name}
            name="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            required
            onChange={OnChange}
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={OnChange}
            value={credentials.password}
            required
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
