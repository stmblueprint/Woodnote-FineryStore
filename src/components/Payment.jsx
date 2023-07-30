
import { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Footer from "./Footer";
import Header from "./Header";
import PaymentView from "./PaymentView";
import { useState } from "react";

import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// const amount = JSON.parse(sessionStorage.getItem("subtotal"));

const style = {"layout": "vertical"};

 const Payment = ({currency, showSpinner}) => {

    const [ cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState(null);


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
  const calculatedSubtotal = cartItems.reduce((total, item) => Number(item.price) * cartItems.length, 0);
  setSubtotal(calculatedSubtotal);
}, [cartItems, cartItems.length]);
   
     // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
        
    }, [currency, showSpinner]);

    return (
    <div>
        <Header/>
        { (showSpinner && isPending) && <div className="spinner" /> }

       

        <div className="payment-container">
            <div>
                <PaymentView />
            </div>
        <div className="paypal-buttons">
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[subtotal, currency, style]}
                fundingSource={undefined}
                createOrder={ async (data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: subtotal,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={async function (data, actions) {
                    await actions.order.capture();
                }}
            />
        </div>
        </div>
        <Footer/>
    </div>
);
}

export default Payment;