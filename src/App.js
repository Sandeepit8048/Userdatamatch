import logo from './logo.svg';
import './App.css';
import Login from './Component/login';
import User from './Component/User';
import Edit from './Component/Edit';
import Delete from './Component/Delete';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from './Service/api';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Routes>
    {/* <div className="App"> */}
    <Route path="/" element={<Login />} />
    <Route path="/users" element={<User />} />
    <Route path="/edit/:id" element={<Edit />} />
  
    <Route path="/Delete/:id" element={<Delete/>} />


      {/* <api/> */}
      {/* </div> */}
    </Routes>
  );
}

export default App;
