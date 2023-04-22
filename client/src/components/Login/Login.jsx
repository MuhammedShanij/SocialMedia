import React from 'react'
import './Login.css'
import Container from 'react-bootstrap/Container';
import { useState ,useEffect} from 'react';
import axios from '../../utils/axios'
import { loginPost } from '../../utils/Constants';
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { change } from '../../Redux/usernameReducer';

function Login() {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');





  useEffect(() => {
    const Token = localStorage.getItem("token");
    console.log("token", Token);
    if (Token) {
      return navigate("/");
    }
  }, []);






  const handleLogin = (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      email,
      password,
    })
    axios.post(loginPost, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
      localStorage.setItem('token', res.data.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successfully',
        showConfirmButton: false,
        timer: 1500
     })
      // window.alert("Login success")
      dispatch(change(res.data.user))
      navigate('/')
    }).catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: err.response.data.message,
        showConfirmButton: false,
        timer:1500
    })

    })

  }
    return (
        <Container>
            <div className='container'>
                <div className='course-container'>
                    <div className='image1-container'></div>
                    <div className='detail-container'>
                        <h1 style={{ textAlign: 'center' }}>Welcome Back</h1>
                        <p style={{ textAlign: 'center', fontSize:'24px', marginTop:'-16px' }}>Login</p>
                        <form className='form-content' onSubmit={handleLogin}>
                            <input type="text" placeholder='Email'  value={email}
                        onChange={(e) => { setEmail(e.target.value) }}/>
                            <input type="password" placeholder='Password' value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                            <div>
                                <p style={{ marginTop: '-20px', marginInline:'-170px' }}>forgot password?</p>
                            </div>
                            <button type='submit'>Login</button>
                            <p style={{ marginTop: '-20px' }}>OR</p>
                            <Link to={'/register'}><button>Signup</button></Link>
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

export default Login