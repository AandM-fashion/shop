import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import '../styles/aboutus.css'
import React from 'react'


const PrivacyPolicy = () => {
  return (
    <Helmet title='Shipping and Return Policy'>

  <CommonSection title='Shipping and Return Policy'/>
  
  <section className="pp justify-content-space-between mb-5 mt-5">
  <h4>Shipping:</h4>
    <p> We strive to process and ship orders promptly. Once your order is placed, it will be processed within [X] business days. Shipping times may vary depending on your location and the shipping method selected during checkout.</p>
    <p> We offer both domestic and international shipping. The shipping costs will be calculated based on the destination and weight of the package.</p>
    <p> Please ensure that the shipping address provided is accurate and complete. A&M is not responsible for any delays or issues caused by incorrect shipping information.</p>
    <h4>Returns:</h4>
    <p> We accept returns within 7 days from the date of delivery. If 7 days have passed since your purchase, unfortunately, we cannot offer you a refund or exchange.</p>
    <p> To be eligible for a return, the item must be unused, in its original condition, and in the original packaging. Any item that is damaged, altered, or missing parts will not be eligible for a refund.</p>
    <p> To initiate a return, please contact our customer service team with your order details. They will provide you with further instructions on how to proceed.</p>
    <p> Please note that all return shipping charges will be the responsibility of the customer. The return shipping charges will be equal to the original delivery charges.</p>
    <p> We recommend using a trackable shipping method to ensure that the returned items reach us safely. A&M is not responsible for any lost or damaged items during the return shipping process.</p>
    <p> Once we receive and inspect the returned items, we will process your refund or exchange as per your request. Refunds will be issued to the original payment method used during the purchase.</p>
    <h4>Exchanges:</h4>
    <p> If you wish to exchange an item for a different size, color, or style, please contact our customer service team. They will guide you through the exchange process and assist you in selecting the desired replacement item. Please note that exchange requests are subject to product availability.</p>
    <h4>Damaged or Defective Items:</h4>
    <p> If you receive a damaged or defective item, please contact our customer service team immediately. We will gladly replace the item or issue a refund as per your preference. Please provide detailed information and photos of the damaged or defective item when contacting us.</p>
    <p>Please ensure that you review the product details, sizing information, and specifications before making a purchase to avoid any inconvenience during the return process.</p>
    <p className="pp">If you have any questions or concerns regarding our Shipping and Returns Policy, please contact our customer service team at aandm475@gmail.com. We are here to assist you.</p>
    <p className="pp">Last Updated: 01-06-2023</p>
  </section>
  
  
  </Helmet>
  )
}

export default PrivacyPolicy