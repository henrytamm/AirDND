import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import airbnblogo from "../../images/airbnblogo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser?.id) {
    sessionLinks = (
      <>
      <a href="https://github.com/henrytamm/AirBnB-Mod4-Project">My Github</a>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className='login-signup-container'>

      <button className='login-button'>
        <NavLink to="/login">Log In</NavLink>
      </button>
      <button className='signup-button'>
        <NavLink to="/signup">Sign Up</NavLink>
      </button>
      <button>

      <a href="https://github.com/henrytamm/AirBnB-Mod4-Project">My Github</a>
      </button>
      </div>
    );
  }

  return (
    <>
    <div className='logo-container'>
      <NavLink exact to="/">
      <img className='logo' src={airbnblogo}></img>
      </NavLink>
    </div>
    <ul>
        {isLoaded && sessionLinks}
    </ul>
    </>
  );
}

export default Navigation;