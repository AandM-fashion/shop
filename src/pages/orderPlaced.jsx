import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Container, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animationData from '../assets/lottie/79094-blue-shopping-cart.json';
import '../styles/orderPlaced.css'; // Import the CSS file for styling

const OrderPlaced = ({ orderId }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiAnimation, setConfettiAnimation] = useState('running');



  useEffect(() => {
    const confettiTimeout = setTimeout(() => {
      setConfettiAnimation('stopping');
    }, 5000);

    return () => {
      clearTimeout(confettiTimeout);
    };
  }, []);

  const handleContinueShopping = () => {
    navigate('/home');
  };

  return (
    <section className="order-placed-section">
      <Container>
        <div className="lottie-animation">
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
            }}
            width={300}
            height={300}
          />
        </div>

        {showConfetti && (
          <div className="confetti-wrapper">
            <Confetti
              run={confettiAnimation}
              recycle={confettiAnimation === 'running'}
            />
          </div>
        )}
        
        
        
        <div className="text-center">
        <h4 className='texto big'>Thank you</h4>
          <h4 className='texto small'>for placing the order!</h4>
          <h4 className='texto'>Your order has been successfully placed, and we are thrilled to have the opportunity to serve you. We appreciate your trust in a&m.</h4>
          <Button className='buy__button' onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <h4 className="texto small2">We have received your order, and our team is now diligently processing it. Rest assured that we are working hard to ensure a smooth and efficient experience for you.</h4>
        
          
        </div>
      </Container>
    </section>
  );
};

export default OrderPlaced;
