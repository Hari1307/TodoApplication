import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getToken,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";

export const Login = () => {
  const [login, setLogin] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  const setLoginValues = (e) => {
    setLogin((props) => ({ ...props, [e.target.name]: e.target.value }));

    console.log(login);
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/api/auth/login", login)
      .then((response) => {
        // this is for basic auth
        // here window.btoa is used to convert the string into base64 encoded value
        // const token =
        //   "Basic " + window.btoa(login.userNameOrEmail + ":" + login.password);

        // jwt Auth
        const tokenType = response.data.tokenType;
        const token = tokenType + response.data.accessToken;

        const role = response.data.role;

        saveLoggedInUser(login.userNameOrEmail, role);

        console.log(
          token + "   ====> token that we have saved while logging in"
        );
        console.log(getToken + "  ======>get token");
        storeToken(token);
        console.log(response.data);
        navigate("/getAll");
        window.location.reload(false);
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
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3">UserName / Email id : </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Enter userName or Email id"
                      className="form-control"
                      value={login.userNameOrEmail}
                      name="userNameOrEmail"
                      onChange={(e) => setLoginValues(e)}
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
                      value={login.password}
                      name="password"
                      onChange={(e) => setLoginValues(e)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => LoginUser(e)}
                  >
                    Login
                  </button>
                  Not registered <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
