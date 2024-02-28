import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdminUser, isUserLoggedIn, logout } from "../services/AuthService";

export const Header = () => {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <Link className="navbar-brand" to="/getAll">
              Todo Management
            </Link>
            {isAuth && isAdmin && (
              <Link className="btn btn-primary" to="/add-todo">
                Add Todo
              </Link>
            )}

            {isAuth && (
              <Link className="btn btn-primary" to="/getAll">
                List Todos
              </Link>
            )}
            {isAuth && (
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            )}

            {!isAuth && (
              <Link className="btn btn-secondary" to="/register">
                Register
              </Link>
            )}

            {!isAuth && (
              <Link className="btn btn-secondary" to="/login">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
