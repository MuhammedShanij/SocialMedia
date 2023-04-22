import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/SignUp/Register';
import HomePage from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import EditProfile from './Pages/EditProfile/EditProfile';
import UsersProfile from './Pages/UsersProfile/UsersProfile';



import { Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/getUser/:id" element={<UsersProfile/>}/>



      </Routes>

    </div>
  );
}

export default App;
