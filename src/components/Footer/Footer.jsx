import React,{useEffect} from "react";
import './footer.css'
import logo from "../../assets/images/eco-logo.png"
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {Link} from "react-router-dom";

const Footer = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  
  const year = new Date().getFullYear()
  return <footer className="footer">
    
  
    <Container>
      <Row>
        <Col lg='12' className="mb-4" md='6'>
          <div className="logo">
            <img src={logo} alt="logo" />

            
          </div>
          <p className="footer__text mt-4">A&M is your destination for curated fashion that celebrates individuality. With a focus on quality and style, we offer a carefully selected collection of garments that encompass elegance, sophistication, and modern trends. Our diverse range ensures there's something for every taste and occasion. Join us in embracing the art of self-expression through fashion at A&M.</p>
        </Col>

        <Col lg='4' md='3' className="mb-4">
          <div className="footer__quick-links">
            <h4 className="quick__links-title">Top Categories</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Saree</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Dress Material</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Ready Made</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>PartyWear</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>DailyWear</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>OfficeWear</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Gowns</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='4' md='3' className="mb-4">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Useful Links</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to='/Home'>Home</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/Shop'>Shop</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/Cart'>Cart</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/PrivacyPolicy'>Privacy policy</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/TermsAndConditions'>Terms and Conditions</Link>
              </ListGroupItem>

              
            </ListGroup>
          </div>
        </Col>

        <Col lg='4'  className="mb-4">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Contact</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i class="ri-map-pin-line"></i></span>
                <p> Malakpet, Hyderabad, India (500036)</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
              <span><i class="ri-phone-line"></i></span>
                <p>+91-9346401198</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
              <span><i class="ri-mail-line"></i></span>
                <p>aandm475@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
              <span><i class="ri-time-line"></i></span>
                <p>8:00am - 5:00pm (IST)</p>
              </ListGroupItem>


              
            </ListGroup>
          </div>
        </Col>
        <Col className="text-center social" lg='12'>
        <p className="socialp">
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
          <i class="ri-pinterest-fill"></i>
          </a>
          <a href="https://wa.me/9346401198?text=I%20am%20interested%20in%20shopping%20with%20a%26m%20fashion" target="_blank" rel="noopener noreferrer">
          <i class="ri-whatsapp-line"></i>
          </a>
        </p>
        </Col>





        <Col lg='12'>
          <p className="footer__copyright">a&m <i class="ri-copyright-line"></i> 2022- {year}. All rights reserved. </p>
          
        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;