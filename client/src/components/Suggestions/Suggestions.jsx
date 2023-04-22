import React from 'react'
import './Suggestions.css'
import { getUsers } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { changeFollowing } from "../../Redux/userFollowingReducer";
import { Link } from 'react-router-dom'



import axios from '../../utils/axios'
import { useState, useEffect } from 'react';
import { follow} from '../../utils/Constants';



function Suggestions() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [users, setUsers] = useState([])

  const userFollowing = useSelector((state) => {
    return state.userFollowing;
  });
    useEffect((key) => {

      getUsersList()
  
    },[])
    
  const getUsersList = () => {
    const Token = localStorage.getItem("token");
        let Stoken = JSON.stringify({ Token })
    axios.get(`${getUsers}/${Stoken}`).then((response) => {
        setUsers(response.data.usersData)
        console.log("users",response)
    }).catch((error) => {
      console.log("inside catch");
      console.log(error);
    })

  }
  const followUser=(id)=> {
    const Token = localStorage.getItem("token");
        let Stoken = JSON.stringify({ Token })
    axios.patch(`${follow}/${Stoken}/${id}`).then((res) => {
      setUsers(res.data.usersData)
       dispatch(changeFollowing(res.data.followingCount))

    }).catch((err) => {
        console.log(err);
    })

}

  return (
    <div className='suggestionbar'>
      <p className='title1'>Top Suggestions{userFollowing}</p>
      {users.map((obj, index) =>
      <div className='profiledet' >
                            

        <img className='profilepic1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-RmbbqvwGsaz4PytA63zRgBGdBIn7FroPg&usqp=CAU" alt="Cinque Terre" onClick={() => navigate(`/getUser/${obj._id}`)}></img>
        <p className='profiletitle' onClick={() => navigate(`/getUser/${obj._id}`)}>{obj.username}</p>
        <button className='followbtn' onClick={() => followUser(obj._id)}>{obj.isFollowing? <span>following</span>:<span>follow</span>}</button>

      </div>
      )
    }
    </div>
  )
}

export default Suggestions