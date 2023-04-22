import React from "react";
import "./Myinfo.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { change } from "../../Redux/usernameReducer";
import { changeImage } from "../../Redux/userImageReducer";

import { verifyToken } from "../../utils/Constants";
import { changeFollowing } from "../../Redux/userFollowingReducer";

function Myinfo() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState("");
  const userFollowing = useSelector((state) => {
    return state.userFollowing;
  });

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
          setFullname(res.data.user && res.data.user.fullname);
          setImage(res.data.user.image.url);

          dispatch(change(res.data.user.username));
          dispatch(changeImage(res.data.user.image.url));
          dispatch(changeFollowing(res.data.followingCount));

        })
        .catch((err) => {
          localStorage.removeItem("token");
        });
    }
  }, [navigate, dispatch]);

  const userImage = useSelector((state) => {
    return state.userImage;
  });
  const username = useSelector((state) => {
    return state.username;
  });

  return (
    <Card className="showProfile">
      <Card.Title className="title">My info</Card.Title>
      <Card.Img className="profilepic" src={image} alt="Cinque Terre" />
      <Card.Title className="profileName">{username}</Card.Title>
      <Card.Title className="username">{fullname}</Card.Title>
      <Card.Body className="profileContent">
        <ListGroup variant="flush">
          <ListGroup.Item>
            Posts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
          </ListGroup.Item>
          <ListGroup.Item>
            Followers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;30
          </ListGroup.Item>
          <ListGroup.Item>
            Following&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userFollowing}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Myinfo;

{
  /* <div className='showProfile'>
      <p className='title'>My info</p>
      <div className='profileContent'>
        <img className='profilepic' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlsB6YB55Rt3ysHRNZvGBnBHEF_zP6PRXjGitPw-M1UaJd2dL99fG1yi1QLTFJB5vJ-0&usqp=CAU" alt="Cinque Terre"></img>
        <p>Post</p>
      </div>
    </div> */
}
