import React, { useEffect, useState } from 'react';
import './App.css';
import useAppSelector from './hooks/useAppSelector';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import Main from './components/Main';
import Navigation from './components/Navigation';
import { } from 'react-router-dom';
import TodoPage from './components/TodoPage';
import NoTodo from './components/NoTodo';
import Todo from './components/Todo';
import { Snackbar } from '@mui/material';


function App() {

  const todos = useAppSelector(state => state.todos);






  return (
    <div>
      <Snackbar

      open={todos.loading}
      message='Fetching random todos...'
      autoHideDuration={5000}
      

      />
        
      <BrowserRouter>
        

        <Routes>

          <Route path="/" element={<Navigation />}>
            <Route index element={<Main />}/>
            <Route path="todo" element={<Todo />}>
              <Route path=":todoId" element={<TodoPage />} />
            </Route>
            <Route path="form" element={<TodoForm />} />
            <Route path="*" element={<NoTodo/>} />

          </Route>

          

        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;


