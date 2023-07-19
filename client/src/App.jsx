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
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(true); // to get clientId before the page loads

  useEffect(() => {
    const fetchClientId = async () => {
      const qRef = query(collection(db, 'AdminItems'), where('payPalClientId', '!=', ''));
      const querySnapshot = await getDocs(qRef);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const clientId = doc.data().payPalClientId;

        setClientId(clientId);
      }
      

      setLoading(false);
    };

    fetchClientId();
  }, []);

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
          </Routes>
        </PayPalScriptProvider>
      )}
    </CartProvider>
  );
}

export default App;
