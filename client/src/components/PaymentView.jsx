import { faTimes, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Payment from "./Payment";


const PaymentView = ({ totalItems, setTotalItems}) => {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();

  const subtotal = items.reduce((total, item) => Number(item.price) * Number(totalUniqueItems), 0);

  
  return (
    <>
      {/* <button onClick={toggleCart}>Open Cart ({totalUniqueItems})</button> */}
      
        <div className="cart-popup">
          <div className="cart-header">
            {/* <h3>CART <span style={{opacity: "0.5"}}>{totalUniqueItems}</span></h3> */}

           
          </div>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={item.productId} className="cart-item">
                <div className="cart-img">
                  <img src={item.image} alt={item.title} width={120} />
                </div>

                <div className="cart-product-info">
                  <div style={{fontWeight: "bold"}}>{item.name}</div>

                  <div style={{opacity: "0.8"}} className="">
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
         
            <div className="" style={{fontWeight: "bold"}}>
              <span>Shipping</span>
              <span className="center">${'0.00'}</span>
            </div>

            <div className="" style={{fontWeight: "bold"}}>
              <span>Taxes</span>
              <span className="center">${'0.00'}</span>
            </div>

            <div className="subtotal" style={{fontWeight: "bold"}}>
              <span>Subtotal</span>
              <span className="center">${subtotal.toFixed(2)}</span>
            </div>
            <hr/>
            <div className="subtotal" style={{fontWeight: "bold"}}>
                <span>Total</span>
                <span className="center">${subtotal.toFixed(2)}</span>
            </div>

          </div>
        </div>
      
    </>
  );
};

export default PaymentView;