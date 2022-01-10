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


function App() {

  const todos = useAppSelector(state => state.todos);






  return (
    <div>
      {todos.loading ? <div className="alert">Loading...</div> : ''}
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/">
            <Route path="main" element={<Main />}>
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


