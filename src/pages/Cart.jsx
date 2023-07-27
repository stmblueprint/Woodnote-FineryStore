import { faTimes, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";



const CartPopup = ({ isOpen, setIsOpen, totalItems, setTotalItems}) => {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();
  const [email, setEmail] = useState("");

  const subtotal = items.reduce((total, item) => Number(item.price) * Number(totalUniqueItems), 0);

  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  
  // ------------------------------------------------------------------------------
    const storedUserUserId = sessionStorage.getItem("uid");
    const parsedUserId = JSON.parse(storedUserUserId);
    const cartId = parsedUserId;
  // ------------------------------------------------------------------------------



  // update total whenever it changes to display in another view
  useEffect(() => {

    // Function to update cart items in Firestore
    const updateCartItemsInFirestore = async (updatedItems) => {
      try {
        // Replace "your_cart_document_id" with the actual cart document ID in Firestore
        const cartRef = doc(db, "Orders", cartId);

        // Update the 'items' field in Firestore with the updatedItems array
        await setDoc(cartRef, { items: updatedItems }, { merge: true });

        console.log("Cart items updated in Firestore successfully!");
      } catch (error) {
        console.error("Error updating cart items in Firestore: ", error);
      }
    };

    const storedEmail = sessionStorage.getItem("email");
    const parsedEmail = JSON.parse(storedEmail);
    setEmail(parsedEmail);
    setTotalItems(totalUniqueItems);

    if (items) {
      updateCartItemsInFirestore(items);
    }
  }, [totalUniqueItems, setTotalItems, items, cartId]);

  

  return (
    <>
    {items.price}
      {/* <button onClick={toggleCart}>Open Cart ({totalUniqueItems})</button> */}
      {isOpen  && (
        <div className="cart-popup">
          <div className="cart-header">
            <h3>CART <span style={{opacity: "0.5"}}>{totalUniqueItems}</span></h3>

            <div className="button-style-3">
              <button onClick={toggleCart}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <hr />
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={item.productId} className="cart-item">
                <div className="cart-img">
                  <img src={item.image} alt={item.title} width={50} />
                </div>

                <div className="cart-product-info">
                  <button className="button-style-1 color-indicator-1" 
                          style={{position: "absolute", left: "25%"}}
                          onClick={() => removeItem(item.id)}>
                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                  </button>
                  <div style={{fontWeight: "bold"}}>{item.name}</div>

                  <div style={{opacity: "0.8"}}>
                    <div>Color: {item.color}</div>
                    <div>Size: {item.size}</div>
                    <div>Price: ${item.price}</div>
                  </div>
                </div>

                {index !== items.length - 1 && <hr className="cart-item-divider" />} {/* Add horizontal line if not the last item */}
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="subtotal" style={{fontWeight: "bold"}}>
              <span>Subtotal: </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="button-style-2 center"style={{marginTop: "bold"}}>
               <button className="button-style-1">
               {email ? (
                  <Link to={"/shipping"} style={{ color: "white" }}>
                    Checkout
                  </Link>) : (<Link to={"/account"} style={{ color: "white" }}>Checkout</Link>
                )}
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPopup;

