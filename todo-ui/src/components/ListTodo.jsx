import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";
import {} from "../services/TodoService";
export const ListTodo = () => {
  const [todo, setTodo] = useState([]);

  const isAdmin = isAdminUser();

  useEffect(() => {
    getAllTodo();
    console.log(todo);
  }, []);

  const getAllTodo = async () => {
    await axios
      .get("http://localhost:8081/api/todo/getAll")
      .then((response) => setTodo(response.data))
      .catch((e) =>
        console.log("Error while fetching the data from the api :- " + e)
      );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8081/api/todo/delete/${id}`);
    getAllTodo();
  };

  const completeTodo = async (id) => {
    await axios.patch(`http://localhost:8081/api/todo/complete/${id}`);
    getAllTodo();
  };
  const inCompleteTodo = async (id) => {
    await axios.patch(`http://localhost:8081/api/todo/inComplete/${id}`);
    getAllTodo();
  };

  return (
    <div className="container">
      <h1 className="text-center">Todo List Entry</h1>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed !</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item) => {
              console.log(item);
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.completed ? "Yes" : "No"}</td>
                  <td>
                    {isAdmin && (
                      <Link className="btn btn-primary" to={`/edit/${item.id}`}>
                        Update
                      </Link>
                    )}
                    {isAdmin && (
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(item.id)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      className="btn btn-success"
                      onClick={() => completeTodo(item.id)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => inCompleteTodo(item.id)}
                    >
                      InComplete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
