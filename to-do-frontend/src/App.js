import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoutes from './utils/PrivateRoute'

//Components
import Login from './containers/login/Login'
import Task from './containers/task/Task'
import SignUp from './containers/signup/SignUp';



function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Task />} path='/tasks' />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App










