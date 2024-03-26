// import logo from './logo.svg';
import './App.css';
import Signup from './signup/Signup';
import Login from "./login /Login"
import {Routes, Route } from "react-router-dom";
function App() {
  return (
  <>
 <Routes>
        <Route path="/" Component={Login }/>

        <Route path="/signup" Component={Signup}/>
      </Routes>
 

  </>
  );
}

export default App;
