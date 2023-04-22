import React from 'react'
import Container from 'react-bootstrap/Container';
import './Register.css'
import { useState,useEffect } from 'react';
import axios from '../../utils/axios'
import { signUpPost } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const Token = localStorage.getItem("token");
        console.log("token", Token);
        if (Token) {
          return navigate("/");
        }
      }, []);

    const handleSubmit = (e) => {
        const body = JSON.stringify({
            username,
            email,
            password
        })

        e.preventDefault()
        axios.post(signUpPost, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
            if (response.data.status === 'ok') {
                navigate('/login')
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: response.data.error,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }).catch((err) => {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: err.data.error,
                showConfirmButton: false,
                timer: 1500
              })
        })

    }
  return (
    <Container>
            <div className='container'>
                <div className='main-container'>
                    <div className='image-container'>
                </div>
                    <div className='detail-container'>
                        <h1 style={{ textAlign: 'center' }}>Welcome Back</h1>
                        <p style={{ textAlign: 'center', fontSize:'24px', marginTop:'-16px' }}>Register</p>
                        <form className='form-content'  onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username'  value={username}
                                                        onChange={(e) => { setUsername(e.target.value)}} />
                        {/* <input type="text" placeholder='Mobile no' /> */}
                            <input type="text" placeholder='Email' value={email}
                                                onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" placeholder='Password' value={password}
                                                onChange={(e) => { setPassword(e.target.value) }}/>
                            <button type='submit'>Signup</button>
                            <p style={{ marginTop: '-20px' }}>OR</p>
                            <div>
                                <button className='google_button'><i class="fa-brands fa-google"></i></button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Container>
  )
}

export default Register