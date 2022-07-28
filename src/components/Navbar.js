import {React} from "react";
import {Link,useLocation,useNavigate } from "react-router-dom";
// import Theme from "../context/notes/Theme";

export default function Navbar(props) {

  let location = useLocation();
 let history=useNavigate();
  // const t = useContext(Theme);
  //  const {mode,changemode} =t;
  
  const handlelogout = () => {
    localStorage.removeItem('token');
    props.showalert("Logged Out Successfully","success");
    history("/login");
  }
//  const changetheme = () => {
//    changemode();
//  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className= {`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('token')?
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/about">
                  About
                </Link>
              </li>: <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/login">
                  About
                </Link>
              }
            </ul>
            {/* <div className="form-check form-switch mx-3">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={changetheme}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">mode</label>
            </div> */}
            {!localStorage.getItem('token')?<form className="d-flex">
             
            <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
            <Link className="btn btn-primary mx-2" role="button" to="/signup">Sign Up</Link>
            </form>:
            <button className="btn btn-primary " onClick={handlelogout}>Logout</button>
            }
          </div>
        </div>
      </nav>
    </>
  );
}
