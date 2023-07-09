import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { collection, query, orderBy, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(ordersRef, orderBy('orderDate', 'desc'));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);

        // Calculate total amount
        const total = ordersData.reduce((acc, order) => acc + order.totalAmount, 0);
        setTotalAmount(total);

        // Store total amount in Firestore
        const totalAmountDocRef = doc(db, 'totals', 'totalAmount');
        const totalAmountDocSnap = await getDoc(totalAmountDocRef);
        if (totalAmountDocSnap.exists()) {
          await setDoc(totalAmountDocRef, { amount: total });
        } else {
          await setDoc(totalAmountDocRef, { amount: total });
        }
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section>
      <Container>
        <h4 className='mb-3'>Orders</h4>
        <Row>
          <Col>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Payment Method</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderDate}>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.zipCode}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Total Amount: {totalAmount}</h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
