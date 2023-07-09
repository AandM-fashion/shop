import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import '../styles/aboutus.css'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Helmet title='Terms and Conditions'>

  <CommonSection title='Terms and Conditions'/>
  
  <section className="pp justify-content-space-between mb-5 mt-5">
    <p>Please read these Terms and Conditions carefully before using the A&M website. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website.

</p>
    <h4 >1.Intellectual Property</h4>
  <p >All content on our website, including but not limited to text, images, graphics, logos, and trademarks, is the property of A&M and protected by applicable intellectual property laws. You may not use, reproduce, modify, or distribute any of our content without prior written consent.</p>
  <h4>2.Product Information</h4>
  <p>We strive to provide accurate and up-to-date information regarding our products. However, we do not warrant the completeness, accuracy, or reliability of any product descriptions or other content on our website. It is your responsibility to review the details of the product before making a purchase.</p>
  
  <h4>3.Pricing and Payment</h4>
  <p>All prices displayed on our website are in the applicable currency and inclusive of any applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. Payments for purchases made on our website are processed through secure third-party payment gateways. A&M does not store or have access to your payment details.</p>
  <h4>4.Shipping and Returns</h4>
  <p>Please refer to our <Link className="linkk" to='/ShippingAndReturn'>Shipping and Returns policy<i class="ri-external-link-line"></i></Link>  for detailed information regarding shipping methods, delivery times, and our return/exchange process.</p>
  <h4>5.User Conduct</h4>
  <p>By using our website, you agree not to engage in any activity that may disrupt or interfere with the proper functioning of our website or violate any laws. You also agree not to attempt to gain unauthorized access to any portion of our website, including sensitive information or user accounts.</p>
    <h4>6.Third-Party Links</h4>
    <p>Our website may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party websites you visit.</p>
    <h4>7.Limitation of Liability</h4>
    <p>To the extent permitted by law, A&M shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of our website or any products purchased through it. This includes, but is not limited to, damages for lost profits, loss of data, or loss of business opportunities.</p>

    <h4>8.Governing Law and Jurisdiction</h4>
    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].

</p>
    <h4>9.Changes to these Terms and Conditions</h4>
    <p>We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be effective upon posting the revised version on our website. It is your responsibility to review these terms periodically for any updates.</p>
    <p></p>
    <p className="pp">If you have any questions or concerns about our Terms and Conditions, please contact us at aandm475@gmail.com</p>
    <p className="pp">Last Updated: 01-06-2023</p>

  </section>
  
  
  </Helmet>
  )
}

export default PrivacyPolicy