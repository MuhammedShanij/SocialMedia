import React from 'react'
import './UsersProfile.css'
import { useParams } from 'react-router-dom';
import { userProfile } from "../../utils/Constants";

import axios from "../../utils/axios";


export default function UsersProfile() {
    const { id } = useParams();
    console.log(id,"hyayy")
    axios.get(`${userProfile}/${id}`).then((res) => {
        
  
      }).catch((err) => {
          console.log(err);
      })
  return (
    <div>
      UsersProfile
    </div>
  )
}
