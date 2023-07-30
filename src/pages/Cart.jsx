import { faTimes, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const CartPopup = ({ isOpen, setIsOpen, totalItems, setTotalItems}) => {
  // const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();

  const [ cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);


  const subtotal = cartItems.reduce((total, item) => Number(item.price) * Number(totalItems), 0);

  useEffect(() => {
  
    sessionStorage.setItem("subtotal", JSON.stringify(subtotal));

  }, [subtotal])
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  
  // ------------------------------------------------------------------------------



  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      
      if (user) {

          const docRef = doc(db, "User", user.uid);
          const docSnapshot = await getDoc(docRef);
         
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log(data.email)
          console.log(data.id)

          sessionStorage.setItem("email", JSON.stringify(data.email));
          localStorage.setItem("uid", JSON.stringify(data.id));

          setEmail(JSON.parse(sessionStorage.getItem("email")));
          setUserId(JSON.parse(localStorage.getItem("uid")));

        }

      } 
      
    });
    return () => {

      listen();
    };
  }, []);

    // const storedUserUserId = localStorage.getItem("uid");
    // const parsedUserId = JSON.parse(storedUserUserId);
    // const cartId = parsedUserId;
  // ------------------------------------------------------------------------------

  const removeItemFromCart = (itemId) => {
    if (!userId || !itemId) {
      console.error("Invalid cartId or itemId.");
      return;
    }
  
    // Find the index of the item with the given itemId in the cartItems array
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  
    if (itemIndex === -1) {
      console.error("Item not found in cartItems.");
      return;
    }
  
    // Remove the item from Firestore using arrayRemove with the specific index
    const cartRef = doc(db, "Orders", userId);
    updateDoc(cartRef, {
      items: arrayRemove(cartItems[itemIndex]),
    })
      .then(() => {
        console.log("Item removed from cart in Firestore successfully!");
        // Update the local state of cartItems to reflect the removal
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
        
         // Reload the page to show the updated cart
         window.location.reload();
  
        // Update the cart items in the local storage
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      })
      .catch((error) => {
        console.error("Error removing item from cart in Firestore: ", error);
      });
  };
  
  


  // update total whenever it changes to display in another view
  // update items in cart and add them to database
  // useEffect(() => {

  //   // Function to update cart items in Firestore
  //   const updateCartItemsInFirestore = async (updatedItems) => {
  //     try {

  //       const cartRef = doc(db, "Orders", cartId);

  //       // Update the 'items' field in Firestore with the updatedItems array
  //       await setDoc(cartRef, { items: updatedItems }, { merge: true });

  //       console.log("Cart items updated in Firestore successfully!");
  //     } catch (error) {
  //       console.error("Error updating cart items in Firestore: ", error);
  //     }
  //   };

  //     const storedEmail = sessionStorage.getItem("email");
  //     const parsedEmail = JSON.parse(storedEmail);
  //     setEmail(parsedEmail);

  //     updateCartItemsInFirestore(cartItems);
    
  // }, [totalUniqueItems, setTotalItems, cartId, email, cartItems]);

     // Fetch cart items from Firestore or sessionStorage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userId) {
          const cartRef = doc(db, "Orders", userId);
          const cartSnapshot = await getDoc(cartRef);

          if (cartSnapshot.exists()) {
            const cartData = cartSnapshot.data();
            // Assuming that the cart items are stored as an array in the 'items' field
            setCartItems(cartData.items || []);
            
          }
        } 
  
      } catch (error) {
        console.error("Error fetching cart items from Firestore: ", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

    useEffect(() => {
      setTotalItems(cartItems.length)
    }, [cartItems, setTotalItems]);

  

  return (
    <>
    
    {cartItems.price}
      {/* <button onClick={toggleCart}>Open Cart ({totalUniqueItems})</button> */}
      {isOpen  && (
        <div className="cart-popup">
          <div className="cart-header">
            <h3>CART <span style={{opacity: "0.5"}}>{totalItems}</span></h3>

            <div className="button-style-3">
              <button onClick={toggleCart}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <hr />
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.productId} className="cart-item">
                <div className="cart-img">
                  <img src={item.image} alt={item.title} width={50} />
                </div>
                <div className="cart-product-info">
                  <button className="button-style-1 color-indicator-1" 
                          style={{position: "absolute", left: "25%"}}
                          
                          onClick={() => removeItemFromCart(item.id)}>
                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                  </button>
                  <div style={{fontWeight: "bold"}}>{item.name}</div>

                  <div style={{opacity: "0.8"}}>
                    <div>Color: {item.color}</div>
                    <div>Size: {item.size}</div>
                    <div>Price: ${item.price}</div>
                  </div>
                </div>

                {index !== cartItems.length - 1 && <hr className="cart-item-divider" />} {/* Add horizontal line if not the last item */}
              </div>
            ))}
          </div>

          <div className="cart-footer">
          
              
               { totalItems === 0 ? (<div className="empty-cart">Cart is Empty</div> )
                
                : (
                   <>
                      <div className="subtotal center" style={{fontWeight: "bold"}}>
                        <span>Subtotal: </span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="button-style-2 center"style={{marginTop: "bold"}}>
                          <button className="button-style-1"><Link to={"/shipping"} style={{ color: "white" }}>Checkout</Link></button>
                      </div>
                   </>
                  )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartPopup;

