import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [money, setMoney] = useState(0);
  return (
    <div>
      
      <br />
      <QRCode
        value={`upi://pay?pa=9052812005@paytm&pn=am_fashion&tn=cftrhwetaw4gta&am=${totalAmount}`}
        size="300"
        logoImage="https://i.postimg.cc/8zLk7hRb/Screenshot-20230618-201141.jpg"
        logoWidth="80"
        logoHeight="100"
        logoOpacity="0.6"
      />
      <p>Scan the code using PhonePe, Google Pay or Paytm</p>
    </div>
  );
}
