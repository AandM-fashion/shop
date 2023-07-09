import React, {useRef,useEffect} from "react";

import { NavLink, useNavigate } from "react-router-dom";
import './header.css';

import {motion} from 'framer-motion'

import logo from "../../assets/images/eco-logo.png"
import userIcon from '../../assets/images/account-circle-line.png'

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from '../../custom-hooks/useAuth';
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'aboutus',
    display:'About Us'
  },
  {
    path:'contactus',
    display:'Contact Us'
  }
]

const Header = () => {

  const headerRef = useRef(null);
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const totalFav = useSelector(state=> state.fav.totalQuantity);
  
  
  const profileActionRef = useRef(null)

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth() 

  const stickyHeaderFunc = ()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop
        > 80){
          headerRef.current.classList.add('sticky__header')
        } else{
          headerRef.current.classList.remove('sticky__header')
        }
    })
  }

  const logout = ()=>{

    signOut(auth).then(()=>{
      toast.success('Logged out');
      navigate('/home')
    }).catch(err=>{
        toast.error(err.message)
    })


  }

  useEffect(()=>{
      stickyHeaderFunc()

      return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
  });

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const navigateToCart =()=>{
    navigate('/cart')
  };

  const navigateToFav =()=>{
    navigate('/fav')
  };

  const toggleProfileActions = ()=> profileActionRef.current.classList.toggle('show__profileActions')

  return <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <Link to='/home'><img src={logo} alt="logo" /></Link>
          </div>


            <div className="navigation" ref={menuRef} onClick = {menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink 
                      to={item.path} 
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              

            <div className="profile">
                <motion.img whileTap={{scale:1.2}} src={ currentUser? currentUser.photoURL : userIcon} alt="" onClick={toggleProfileActions} />
                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>Logout</span>
                      <Link to='/cart'>My Cart</Link>
                      <Link to='/fav'>My Wishlist</Link>
                      <Link to='/myorders'>My orders</Link>
                      </div> : 
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                      <Link to='/resplendent90'>Dashboard</Link>
                    </div>
                  }
                </div>
                
              </div>

              <span className="fav__icon" onClick={navigateToFav} >
                <i class="ri-heart-line" ></i>
                <span className="badge">{totalFav}</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

             
              <div className="mobile__menu">
              <span onClick={menuToggle}><i class='ri-menu-line'></i></span>
            </div>
            </div>

            

        </div>
      </Row>
    </Container>
  </header>
};

export default Header;