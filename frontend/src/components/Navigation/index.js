import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import airbnblogo from "../../images/airbnblogo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser?.id) {
    sessionLinks = (
      <>
      <div className='navi'></div>
      <a href="https://github.com/henrytamm/AirBnB-Mod4-Project">My Github</a>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
      <div className='log-signup-button'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>

      </div>
      </>
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
      <li>
        <NavLink exact to="/">Home   </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </>
  );
}

export default Navigation;