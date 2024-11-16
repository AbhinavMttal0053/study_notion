import React from 'react';
import "./App.css";
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import OpenRoutes from './components/core/Auth/OpenRoutes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import ErrorPage from './pages/ErrorPage'

function App(){
  return (    
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col
    font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>

        <Route
          path="signup"
          element={
            <OpenRoutes>
              <Signup />
            </OpenRoutes>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
    <Route
          path="forgot-password"
          element={
            <OpenRoutes>
              <ResetPassword/>
            </OpenRoutes>
          }
        />

    <Route
          path="update-password/:id"
          element={
            <OpenRoutes>
              <UpdatePassword/>
            </OpenRoutes>
          }
        />

    <Route
          path="verify-email"
          element={
            <OpenRoutes>
              <VerifyEmail/>
            </OpenRoutes>
          }
        />

    <Route path="about"element={<About/>}/>

<Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      {/* <Route path="dashboard/settings" element={<Setting />} /> */}

    </Route>

        <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </div>
  )
}

export default App;