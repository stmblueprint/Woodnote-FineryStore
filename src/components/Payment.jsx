
import { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Footer from "./Footer";
import Header from "./Header";
import PaymentView from "./PaymentView";

import { collection, getDocs, getDoc, doc, documentId, addDoc, where, setDoc, query } from "firebase/firestore";
import { db } from "../firebase/firebase" 


const amount = JSON.parse(sessionStorage.getItem("subtotal"));

const style = {"layout": "vertical"};

 const Payment = ({currency, showSpinner}) => {
   
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
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={ async (data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
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