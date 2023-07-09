import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from "reactstrap";
import abtus from '../assets/images/abtus.png';
import '../styles/aboutus.css'
import img from '../assets/images/a&m-store.jpeg'

const Aboutus = () => {
  return <Helmet title='About Us'>

  <CommonSection title='#KnowUs'/>
  <Container>
    <Row>
      
        
        <Col lg='7'>
          <div class="about-us">
          <h2>About A&M</h2>
          <p>Welcome to A&M, a fashion haven where creativity, elegance, and passion collide. Our vision is to be the destination of choice for fashion enthusiasts seeking unique and captivating apparel. With a keen eye for trends and a commitment to quality, we carefully curate a collection that showcases the latest styles while embracing timeless classics.

At A&M, we believe that fashion is an art form that allows individuals to express their inner beauty and confidence. Our team of dedicated fashion experts works tirelessly to bring you an exquisite selection of garments that celebrate individuality and empower you to make a statement with your style.

From stunning dresses that turn heads to chic tops that effortlessly elevate your ensemble, each piece in our collection is thoughtfully crafted with attention to detail and made from premium materials. We understand that fashion is not just about looking good; it's about feeling confident and comfortable in your own skin.

Beyond our commitment to exceptional fashion, we prioritize the satisfaction of our valued customers. With a seamless online shopping experience, secure transactions, and prompt customer service, we strive to make your journey with us as effortless and enjoyable as possible.

Join us as we embrace the art of fashion and embark on a stylish adventure together. Discover the allure of A&M and indulge in the joy of expressing your unique style. With our exceptional collection and unwavering dedication to your satisfaction, A&M is here to redefine your fashion experience.</p>
          </div>
        </Col>
        <Col className="imgg" lg='5'>
        <img src={img} alt="A&M Logo"/>
        </Col>

      <Col lg='5' >
        <img className="image" src={abtus} alt="" />
      </Col>
      
      <Col lg='7'>
      <h2 className="h223">Who?</h2>
      <p className="pp">A&M was founded by A and M, two fashion enthusiasts with a shared passion for creating a clothing brand that embodies style, quality, and authenticity. With a combined experience in the fashion industry, they set out on a mission to offer a curated selection of garments that capture the essence of contemporary fashion while maintaining a timeless appeal. A's keen eye for design and M's expertise in sourcing and manufacturing enable them to deliver products that meet the highest standards of craftsmanship. Inspired by their own personal styles and a desire to make fashion accessible to all, A and M strive to create a brand that resonates with individuals seeking confidence and self-expression through their clothing choices. As founders of A&M, they are dedicated to providing exceptional customer experiences and are constantly seeking innovative ways to push the boundaries of fashion.</p>
      </Col>
    </Row>
  </Container>


</Helmet>
};

export default Aboutus;