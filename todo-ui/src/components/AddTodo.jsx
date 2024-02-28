import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {} from "../services/TodoService";
export const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      todoById(id);
    }
  }, [id]);

  const todoById = async (e) => {
    await axios
      .get(`http://localhost:8081/api/todo/get/${id}`)
      .then((response) => setTodo(response.data))
      .catch((e) => console.log(e));
  };

  const setValues = (e) => {
    if (e.target.name === "completed") {
      const isCompleted = e.target.value === "true" ? true : false;
      if (isCompleted) {
        setTodo((props) => ({ ...props, [e.target.name]: isCompleted }));
      } else {
        setTodo((props) => ({ ...props, [e.target.name]: isCompleted }));
      }
    } else {
      setTodo((props) => ({
        ...props,
        [e.target.name]: e.target.value,
      }));
    }
    console.log(todo);
  };

  const saveData = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8081/api/todo/update/${id}`, todo);
      navigate("/getAll");
    } else {
      console.log("inside the save button");
      console.log(todo);
      await axios.post("http://localhost:8081/api/todo/add", todo);
      navigate("/getAll");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h1 className="text-center">{id ? "Edit Todo" : "Add Todo"}</h1>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={todo.title}
                  onChange={(e) => setValues(e)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={todo.description}
                  placeholder="Enter Description"
                  onChange={(e) => setValues(e)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Completed</label>
                <select
                  className="form-control"
                  name="completed"
                  onChange={(e) => setValues(e)}
                  value={todo.completed}
                >
                  <option>Select options</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button className="btn btn-success" onClick={(e) => saveData(e)}>
                {id ? "update" : "save"}
              </button>
              <Link className="btn btn-primary" to={"/getAll"}>
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
