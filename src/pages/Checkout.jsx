import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/checkout.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ReactWhatsapp from 'react-whatsapp';
import axios from 'axios';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  const delfee = Math.floor((totalAmount * 18) / 100);
  const taxes = Math.floor(totalAmount * (12 / 100) - totalAmount * (8 / 100));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      if (!paymentMethod) {
        toast.error('Please select a payment method');
        return;
      }

      if (phone.length !== 13) {
        toast.error('Phone number should be 10 digits long');
        return;
      }

      if (name.length < 3) {
        toast.error('Name should have a minimum of 3 characters');
        return;
      }

      if (!/^\d{6}$/.test(zipCode)) {
        toast.error('Zip code should be a 6-digit number');
        return;
      }

      // Set loading state to true
      setLoading(true);

      if (paymentMethod === 'cod') {
        // Save orderdetails to Firestore
        const ordersRef = collection(db, 'orders');
        const orderData = {
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          zipCode: zipCode,
          paymentMethod: paymentMethod,
          items: cartItems,
          totalAmount: totalAmount,
          orderDate: new Date().toLocaleString(),
        };
        const docRef = await addDoc(ordersRef, orderData);

        const messageBody = `New order received\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nZip Code: ${zipCode}\nPayment Method: ${paymentMethod}\nTotal Amount: ${totalAmount}\nOrder Date: ${new Date().toLocaleString()}`;

        const adminPhoneNumber = 'whatsapp:+919346401198';

        await axios.post('http://localhost:3001/send-sms', { orderData, adminPhoneNumber });

        dispatch(cartActions.clearCart());

        toast.success('Order placed successfully');
        navigate('/orderplaced', { state: { orderId: docRef.id, orderData, cartItems, totalAmount } });
      } else if (paymentMethod === 'online') {
        navigate('/payment');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error placing order');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="4">
            <h4>Order Summary</h4>
            <div className="table_total">
              <table width="100%" className="table tableo table-borderd w-100">
                <thead>
                  <tr>
                    <th className="text-center">Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const finalprice = item.price * item.quantity;
                    return (
                      <tr key={item.id}>
                        <td className="text-center">{item.title}</td>
                        <td className="text-center">Rs.{item.price}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">Rs.{finalprice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="divvvv">
              <p>Total Amount:</p>
              <p className="ppp"> Rs.{totalAmount}</p>
            </div>
            <div className="divvvv">
              <p>Taxes</p>
              <p className="ppp"> Rs.{taxes}</p>
            </div>
            <div className="divvvv">
              <p>Delivery charges</p>
              <p className="ppp">
                <s>Rs.{Math.floor(delfee)}</s>FREE
              </p>
            </div>
            <div className="divvvv">
              <p>Additional discount</p>
              <p className="ppp"> - Rs.{taxes}</p>
            </div>
            <div className="divvvv line_below">
              <h3>Total Amount:</h3>
              <h3 className="ppp"> Rs.{totalAmount}</h3>
            </div>
            <p className="divvvv line_below">Fill in the delivery details to continue</p>
          </Col>
          <Col lg="8">
            <h4 className="mb-3">Delivery Details</h4>
            <Form className="billing__form" onSubmit={handlePlaceOrder}>
              <FormGroup className="form__group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Phone</label>
                <PhoneInput
                  defaultCountry="IN"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputStyle={{ width: '100%' }}
                  inputProps={{
                    required: true,
                  }}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <label>State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Zip Code</label>
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </FormGroup>
              <h4 className="mb-3">Choose Payment Method</h4>
              <FormGroup>
                <label>
                  <input
                    type="checkbox"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  (COD) Cash on Delivery
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  <input
                    type="checkbox"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                  />
                  Pay Online
                </label>
              </FormGroup>
              {paymentMethod === 'online' ? (
                <button onClick={() => setShow(true)} className="buy__button w-100" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Proceed to Pay'}
                </button>
              ) : null}
              {paymentMethod === 'cod' ? (
                <button className="buy__button w-100" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
