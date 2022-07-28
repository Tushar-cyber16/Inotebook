import "./App.css";
import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Theme from "./context/notes/Theme";
function App() {

  const [alert, setalert] = useState(null);
  const showalert= (msg,type) => {
    setalert({
      type:type,
      msg:msg
    });
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }
  return (
    <>
      <NoteState>
        <Theme>
        <Router>
          <Navbar showalert={showalert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert}/>} />
             <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={ <Login showalert={showalert}/> } />
              <Route exact path="/signup" element={ <Signup showalert={showalert}/> } />
            </Routes>
          </div>
        </Router>
        </Theme>
      </NoteState>
    </>
  );
}

export default App;
