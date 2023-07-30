

import logo from '../assets/woodnote_logo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser,  faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CartPopup from '../pages/Cart';
import { useState, useRef, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { useNavigate } from "react-router"


import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from '../firebase/firebase';


const Header = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    // get session email and remove the parenthesis
    const storedEmail = sessionStorage.getItem("email");
    const parsedEmail = JSON.parse(storedEmail);
    setEmail(parsedEmail);

  }, []);

  const handleCartToggle = () => {
    setIsCartOpen(true)
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        const shouldContinue = window.confirm("Sign out?")
        const toHome = false

        if(shouldContinue){
          const toHome = true
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("uid");
          navigate(toHome ? '/' : '')
          console.log("signed out successful!");

        } 
      })
      .catch((error) => console.log("error"));

     

  };





    return(
        <>
        
          <div className="child-1">
                <CartPopup isOpen={isCartOpen} setIsOpen={setIsCartOpen} totalItems={totalItems} setTotalItems={setTotalItems}/>
          </div>

          
          <div className='center header-logo'>
            <span className='logo'>
              <Link to={'/'}>
                <img src={logo} alt="woodnotefinery_logo" width={250}/>
              </Link>
            </span>      
          </div>  




            <div className='nav-links header center'>

              <div className='main-links center'>
                  <span>
                    <Link to={"/"}>Home</Link>
                  </span>
                  <span>
                  <Link to={"/catalog"}>Catalog</Link>
                  </span>
              </div>

           
              <span className='cart'>

                <span className=''>
                <button className="button-style-1" style={{color: "black"}} onClick={() => handleCartToggle()}>
                  <div style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faShoppingCart} className="icon" />

                      <span className="color-indicator-1 count-position">
                        {totalItems > 0 ? `(${totalItems})` : ""}
                        {}
                      </span>
                  </div>
                </button>
                </span>
      

                  <span>
                  <Link to={"/account"}><FontAwesomeIcon icon={faUser} className='icon'/></Link>

                  {email !== null && (
                    <button onClick={userSignOut} className="button-style-1" style={{color: "black"}}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon " />
                    </button>
                  )} 
                
                </span>
              </span>
              {/* </span> */}
          </div>

          
        
        
        </>
    ) 
}

export default Header;