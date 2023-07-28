import './App.css';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CartView from './pages/Cart';
import ProductView from './components/ProductView';
import ShippingInfo from './components/ShippingInfo';
import Payment from './components/Payment';
import { GetCountryList } from './components/Orders';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthViewManager } from './pages/auth/Account';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(true); // to get clientId before the page loads





  useEffect(() => {
    const storedClientId = sessionStorage.getItem('clientId');

    if (storedClientId) {
      setClientId(storedClientId);
      setLoading(false);
    } else {
      fetchClientId();
    }
  }, []);

  const fetchClientId = async () => {
    try {
      const qRef = query(collection(db, 'AdminItems'), where('payPalClientId', '!=', ''));
      const querySnapshot = await getDocs(qRef);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const clientId = doc.data().payPalClientId;

        setClientId(clientId);
        sessionStorage.setItem('clientId', clientId);
      } else {
        console.error('No PayPal client ID found in Firestore. Please ensure the "payPalClientId" field is set.');
        // Set a default client ID here if required
        // setClientId('YOUR_DEFAULT_CLIENT_ID');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching PayPal client ID:', error);
      // Set a default client ID here if required
      // setClientId('YOUR_DEFAULT_CLIENT_ID');
      setLoading(false);
    }
  };

  return (
    <CartProvider>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': clientId,
            components: 'buttons',
            currency: 'USD'
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/product/:productId" element={<ProductView />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/countries" element={<GetCountryList />} />
            <Route path="/account" element={<AuthViewManager />} />

          </Routes>
        </PayPalScriptProvider>
      )}
    </CartProvider>
  );
}

export default App;
