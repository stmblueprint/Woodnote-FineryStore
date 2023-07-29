import { faTimes, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Payment from "./Payment";

import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";



const PaymentView = ({ totalItems, setTotalItems}) => {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();
  const [ cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // const subtotal = items.reduce((total, item) => Number(item.price) * Number(totalUniqueItems), 0);


    // ------------------------------------------------------------------------------
    const storedUserUserId = sessionStorage.getItem("uid");
    const parsedUserId = JSON.parse(storedUserUserId);
    const cartId = parsedUserId;

  // ------------------------------------------------------------------------------




useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const cartRef = doc(db, "Orders", cartId);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        // Assuming that the cart items are stored as an array in the 'items' field
        setCartItems(cartData.items || []);
      }
    } catch (error) {
      console.error("Error fetching cart items from Firestore: ", error);
    }
  };

  if (cartId) {
    fetchCartItems();
  }
}, [cartId]);

useEffect(() => {
  const calculatedSubtotal = items.reduce((total, item) => Number(item.price) * cartItems.length, 0);
  setSubtotal(calculatedSubtotal);
}, [cartItems.length, items]);


  
  return (
    <>
      {/* <button onClick={toggleCart}>Open Cart ({totalUniqueItems})</button> */}
      
        <div className="cart-popup">
          <div className="cart-header">
            {/* <h3>CART <span style={{opacity: "0.5"}}>{totalUniqueItems}</span></h3> */}

           
          </div>
          <div className="cart-items">
            {cartItems.map((item, index) => (
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


// const orderData = {
//   external_id: '4235234213',
//   shipping: 'STANDARD',
//   recipient: {
//     name: '',
//     company: 'Woodnote-Finery',
//     address1: '',
//     address2: '',
//     city: '',
//     state_code: 'CA',
//     state_name: 'California',
//     country_code: 'US',
//     country_name: 'United States',
//     zip: '91311',
//     phone: 'string',
//     email: 'string',
//     tax_number: '123.456.789-10'
//   },
//   items: [
//     {
//       id: 1,
//       external_id: 'item-1',
//       variant_id: 1,
//       sync_variant_id: 1,
//       external_variant_id: 'variant-1',
//       warehouse_product_variant_id: 1,
//       product_template_id: 1,
//       external_product_id: 'template-123',
//       quantity: 1,
//       price: '13.00',
//       retail_price: '13.00',
//       name: 'Enhanced Matte Paper Poster 18×24',
//       product: {
//         variant_id: 3001,
//         product_id: 301,
//         image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
//         name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)'
//       },
//       files: [
//         {
//           type: 'default',
//           url: 'https://www.example.com/files/tshirts/example.png',
//           options: [
//             {
//               id: 'template_type',
//               value: 'native'
//             }
//           ],
//           filename: 'shirt1.png',
//           visible: true,
//           position: {
//             area_width: 1800,
//             area_height: 2400,
//             width: 1800,
//             height: 1800,
//             top: 300,
//             left: 0,
//             limit_to_print_area: true
//           }
//         }
//       ],
//       options: [
//         {
//           id: 'OptionKey',
//           value: 'OptionValue'
//         }
//       ],
//       sku: null,
//       discontinued: true,
//       out_of_stock: true
//     }
//   ],
//   retail_costs: {
//     currency: 'USD',
//     subtotal: '10.00',
//     discount: '0.00',
//     shipping: '5.00',
//     tax: '0.00'
//   },
//   gift: {
//     subject: 'To John',
//     message: 'Have a nice day'
//   },
//   packing_slip: {}
// };