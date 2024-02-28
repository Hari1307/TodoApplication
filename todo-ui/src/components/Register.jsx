import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const setRegisterValues = (e) => {
    setRegister((props) => ({ ...props, [e.target.name]: e.target.value }));
  };

  const saveRegister = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(register);
    await axios
      .post("http://localhost:8081/api/auth/register", register)
      .then((response) => {
        navigate("/login");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3">Name : </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      value={register.name}
                      name="name"
                      onChange={(e) => setRegisterValues(e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3">UserName : </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Enter UserName"
                      className="form-control"
                      value={register.userName}
                      name="userName"
                      onChange={(e) => setRegisterValues(e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3">Email : </label>
                  <div className="col-md-6">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={register.email}
                      name="email"
                      onChange={(e) => setRegisterValues(e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3">Password : </label>
                  <div className="col-md-6">
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="form-control"
                      value={register.password}
                      name="password"
                      onChange={(e) => setRegisterValues(e)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => saveRegister(e)}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
