import logo from './logo.svg';
import './App.css';
import Login from './Component/login';
import User from './Component/User';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from './Service/api';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Routes>
    {/* <div className="App"> */}
    <Route path="/login" element={<Login />} />
    <Route path="/users" element={<User />} />
      {/* <api/> */}
      {/* </div> */}
    </Routes>
  );
}

export default App;
