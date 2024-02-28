import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ListTodo } from "./components/ListTodo";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();

    if (isAuth) return children;

    return <Navigate to="/" />;
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/getAll"
          element={
            <AuthenticatedRoute>
              <ListTodo />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <AddTodo />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <AuthenticatedRoute>
              <AddTodo />
            </AuthenticatedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
