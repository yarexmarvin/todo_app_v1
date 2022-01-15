import React, { useEffect, useState } from "react";
import "./App.css";
import useAppSelector from "./hooks/useAppSelector";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import TodoForm from "./components/TodoForm";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import {} from "react-router-dom";
import TodoPage from "./components/TodoPage";
import NoTodo from "./components/NoTodo";
import Todo from "./components/Todo";
import { Snackbar } from "@mui/material";
import {
  fetchTodos,
  saveTodos,
} from "./store/action-creators/todoActionCreator";
import { useDispatch } from "react-redux";
import { useAppActions } from "./hooks/useAppActions";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const { fetchTodos, saveTodos } = useAppActions();
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos.todos);
  }, [todos.todos]);

  return (
    <div>
      <Snackbar
        open={todos.loading}
        message="Fetching random todos..."
        autoHideDuration={5000}
      />

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Main />} />
            <Route path="todo" element={<Todo />}>
              <Route path=":todoId" element={<TodoPage />} />
              <Route path="*" element={<NoTodo />} />
            </Route>
            <Route path="form" element={<TodoForm />} />
            <Route path="*" element={<NoTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
