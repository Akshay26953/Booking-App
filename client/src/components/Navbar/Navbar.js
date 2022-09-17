import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const {user}= useContext(AuthContext)

  const {dispatch} = useContext(AuthContext);

  const navigate = useNavigate(); 

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
        // const res = await axios.post("/auth/login", credentials);
        dispatch({type: 'LOGOUT'});
        navigate("/login")
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/">
            <span className="logo">bookMyRoom</span>
          </Link>
            {user? (<><span className='username'>{`Hello, ${user.username}`}</span><Link onClick={handleClick}>
                <button className='navButton'>Logout</button>
                </Link></>  ) : (<div className="navItems">
                <button className='navButton'>Register</button>
                <Link to='/login'>
                <button className='navButton'>Login</button>
                </Link> 
            </div>)}
        </div>
    </div>
  )
}

export default Navbar