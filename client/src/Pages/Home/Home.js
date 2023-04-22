import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import SideNav from "../../components/Menu/SideNav";
import Myinfo from "../../components/MyInfo/Myinfo";
import Suggestions from "../../components/Suggestions/Suggestions";

export default function Home() {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "logout" });
  };
  const username = useSelector((state) => state.username);
  return (
    // <div>
    //   <h1>Home Page</h1>
    //   <span>{ username  ? <span>{username}  <button onClick={logout}><Link className='Link' to="/">Logout</Link></button></span> : <button><Link className='Link' to="/login">Login</Link></button>}</span>

    // </div>
    <div id="home">
      <div className="sidebar">
        <div className="bg-black h- w-full"></div>
        <p className="logo">LOGO</p>
        <div className="sidelist">
          <SideNav />
        </div>

        <div className="rightSidebar">
          <div>
            <Myinfo />
          </div>
          <div>
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
