

import logo from '../assets/woodnote_logo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CartPopup from '../pages/Cart';
import { useState, useRef } from 'react';
import { useCart } from 'react-use-cart';


const Header = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const handleCartToggle = () => {

    setIsCartOpen(true)

  }


    return(
        <>
        
        {/* Implement Hamburger Menu */}
          <div className="child-1">
                <CartPopup isOpen={isCartOpen} setIsOpen={setIsCartOpen} totalItems={totalItems} setTotalItems={setTotalItems}/>
          </div>
        <header className="header header-grid center">

         

          <span className='logo'>
            <Link to={'/'}>
              <img src={logo} alt="woodnotefinery_logo" width={250}/>
            </Link>
          </span>
        

          <span className='nav-links center'>
            <span>
              <Link to={"/"}>Home</Link>
            </span>
            <span>
            <Link to={"/catalog"}>Catalog</Link>
            </span>
            <span>
              Contact
            </span>

            <span className='cart'>

            {/* <span>
             <FontAwesomeIcon icon={faUser} />
            </span> */}

            <span>
             {/* <Link to={'/cart'}> */}
             <button className='button-style-1' onClick={() => handleCartToggle()}>
               <FontAwesomeIcon icon={faShoppingCart} />
               &nbsp;<span className='color-indicator-1'>{totalItems > 0 ? `(${totalItems})` : ""}</span>
             </button>
              {/* </Link> */}
            </span>

          </span>
          </span>


         
          




        </header>
        
        
        </>
    ) 
}

export default Header;