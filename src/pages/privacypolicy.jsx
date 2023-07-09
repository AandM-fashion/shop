import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import '../styles/aboutus.css'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const PrivacyPolicy = () => {
  return (
    <Helmet title='Privacy-Policy'>

  <CommonSection title='Privacy-Policy'/>
  
  <section className="pp justify-content-space-between mb-5 mt-5">
    <p>At A&M, we are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. By accessing or using our website, you consent to the practices described in this Privacy Policy.

</p>
    <h4 >1.Information We Collect</h4>
  <p >We may collect personal information from you when you interact with our website, create an account, place an order, subscribe to our newsletter, or engage in other activities on our site. The information we collect may include your name, email address, shipping address, payment information, and any other information you provide voluntarily.</p>
  <h4>2.How We Use Your Information</h4>
  <p>We may use the information we collect for various purposes, including but not limited to:</p>
  <p><li>Processing and fulfilling your orders</li>
  <li>Communicating with you about your purchases, promotions, and updates</li>
  <li>Providing customer support and addressing your inquiries</li>
  <li>Personalizing your experience on our website</li>
  <li>Sending you newsletters, marketing communications, or targeted advertisements (with your consent)</li>
  <li>Analyzing and improving our products, services, and website functionality</li>
  <li>Complying with legal obligations</li>
  </p>
  <h4>3.Information Sharing</h4>
  <p>We respect your privacy and do not sell, trade, or rent your personal information to third parties for their marketing purposes. However, we may share your information with trusted third-party service providers who assist us in operating our website, delivering products, processing payments, and other necessary functions. We ensure that these service providers handle your information securely and only use it for the purposes specified by us.</p>
  <h4>4.Data Security</h4>
  <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use encryption technology, secure payment gateways, and maintain strict data protection protocols. However, please be aware that no method of data transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
  <h4>5.Cookies and Similar Technologies</h4>
  <p>We may use cookies, web beacons, and other tracking technologies to enhance your browsing experience, analyze website usage, and personalize content. You can adjust your browser settings to refuse cookies or be notified when cookies are being sent. However, please note that disabling cookies may impact certain features and functionality of our website.</p>
    <h4>6.Third-Party Links</h4>
    <p>Our website may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party websites you visit.</p>
    <h4>7.Your Rights and Choices</h4>
    <p>You have the right to access, update, correct, or delete the personal information we hold about you. You can also choose to opt-out of receiving marketing communications from us. Please contact us using the information provided below to exercise your rights or make any privacy-related requests.</p>

    <h4>8.Changes to this Privacy Policy</h4>
    <p>We reserve the right to modify this Privacy Policy at any time. Any changes will be reflected on this page with a revised "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.

</p>
    <p></p>
    <p className="mt-5 fw-800">If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your personal information, please contact us at aandm475@gmail.com</p>
    <p className="mt-5">Last Updated: 01-06-2023</p>

  </section>
  
  
  </Helmet>
  )
}

export default PrivacyPolicy