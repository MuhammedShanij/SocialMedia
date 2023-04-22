import React from 'react'
import './SideNav.css'
import { Link } from 'react-router-dom'
function SideNav() {
  return (
    <div >
        <p className='menuname'>&nbsp;&nbsp;Menu</p>
        <ul className='listitems'>
            <li className='list'><i class="fa-sharp fa-solid fa-house"></i>&nbsp;&nbsp;&nbsp;Home</li>
            <li className='list'><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;&nbsp;Search</li>
            <li className='list'><i class="fa-solid fa-inbox"></i>&nbsp;&nbsp;&nbsp;Messages</li>
            <li className='list'><i class="fa-solid fa-bell"></i>&nbsp;&nbsp;&nbsp;Notifications</li>
                            
                            <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>   <li className='list'><i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Profile</li></Link>
        </ul>
    </div>
  )
}

export default SideNav