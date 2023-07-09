import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/aboutus.css';
import {toast} from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


const ContactUs = () => {

  const lol =()=>{
    toast.success('Review Submitted')
  };

  return <Helmet title='Contact Us'>

  <CommonSection title='Contact Us'/>
  <Container>
    <Row>
      <Col lg='4'>
      <div class="details mt-5 mb-5">
            
            <h2 className="h23">GET IN TOUCH</h2>
            <h3 className="h21">Head office</h3>
            <div>
                <div className="divv">
                <i class="ri-map-pin-2-line"></i>
                    <p>16-2-738/3, Asmangadh, Hyderabad</p>
                </div>
                <div className="divv">
                <i class="ri-mail-line"></i>
                    <p>aandm475@gmail.com</p>
                </div>
                <div className="divv">
                <i class="ri-phone-line"></i>
                    <p>+91 93464 01198</p>
                </div>
                <div className="divv">
                <i class="ri-time-line"></i>
                    <p>Mon-Sat : 8:00 - 17:00</p>
                </div>
            </div>
        </div>
      </Col>
      <Col lg='8'>
      <Form action="" onSubmit={lol} className="auth__form" mt-5 >
        <h2 className="h233 mb-5">We'd love to hear from you</h2>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Name"  />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="email" placeholder="Email"/>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <textarea className="ta" type="email" placeholder="Message..."/>
                  </FormGroup>

                  <button type="submit" className="buy__button auth__btn">Submit</button>
                </Form>
      </Col>
    </Row>
  </Container>

</Helmet>
};

export default ContactUs;