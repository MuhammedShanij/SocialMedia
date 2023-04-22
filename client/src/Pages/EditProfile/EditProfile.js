import React from "react";
import "./EditProfile.css";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { change } from "../../Redux/usernameReducer";
import { verifyToken, editProfile } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Myinfo from "../../components/MyInfo/Myinfo";


export default function() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [fullname, setFullname] = useState("");

  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    console.log("token", Token);
    if (!Token) {
      return navigate("/login");
    } else {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setName(res.data.user.username);
          setemail(res.data.user.email);
          setBio(res.data.user && res.data.user.bio);
          setFullname(res.data.user && res.data.user.fullname);

          dispatch(change(res.data.user.username));
        })
        .catch((err) => {
          localStorage.removeItem("token");
        });
    }
  }, [navigate, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email,
      username:name,
      fullname,
      bio,
    });

    const Token = localStorage.getItem("token");
    let Stoken = JSON.stringify({ Token });
    axios
      .put(`${editProfile}/${Stoken}`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setBio(res.data.bio);
        console.log(res.data.user.username,"fedsf")
        dispatch(change(res.data.user.username));

        // navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
            <Myinfo />

      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>
        <br></br>

        <label>
          Bio:
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <br></br>

        <label>
          Full Name:
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>
        <br></br>

        <input type="submit" />
      </form>
    </div>
  );
}
