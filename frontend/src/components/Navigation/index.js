import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import airdnd from "../../images/airdnd.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionLinks;

  if (sessionUser?.id) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button className="menu-button" onClick={openMenu}>
        <i class="fa-solid fa-bars"></i>
        </button>
        {showMenu && (
         <div className="profile-dropdown">
         <NavLink to="/login" style={{ textDecoration: "none" }}>
           <button className="login-button">Log In</button>
         </NavLink>
         <NavLink to="/signup" style={{ textDecoration: "none" }}>
           <button className="signup-button">Sign Up</button>
         </NavLink>
         <a href="https://github.com/henrytamm/AirBnB-Mod4-Project">
           <button className="create-spot-button">
             <i className="fa-brands fa-github"></i>
             GitHub Repo
           </button>
         </a>
       </div>
       
        )}
      </>
    );
  }

  return (
    <>
      <div className="logo-container">
        <NavLink exact to="/">
          <img className="logo" src={airdnd} style={{ width: "250px" }} alt="AirDnD Logo" />
        </NavLink>
      </div>
      <ul>
        {isLoaded && sessionLinks}
      </ul>
    </>
  );
}

export default Navigation;
