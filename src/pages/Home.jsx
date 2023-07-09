import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock.jsx";
import counterImg from "../assets/images/exp.png";
import useGetData from "../custom-hooks/useGetData.js";
import productLoading from "../components/UI/productLoading";
import gown from '../assets/images/c-gown.png'
import saree from '../assets/images/c-saree.png'
import lehanga from '../assets/images/c-lehanga.png'
import readymade from '../assets/images/c-readymade.png'
import unstitched from '../assets/images/c-unstitched.png'
import sharara from '../assets/images/c-sharara.png'

const Home = () => {
  const limit = 10; // Set the number of documents to fetch at once
  const { data: products, loading } = useGetData("products", limit);

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.Trending === "Yes"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.New === "Yes"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <p className="hero_subtitle">Trending Designs of {year}</p>
                <div className="h21">
                  <h2>Unleash your Style</h2>
                </div>
                <div className="h22 mt-0">
                  <h2 className="colchange">with a&m</h2>
                </div>

                <p>
                  Discover your signature style and make a lasting impression
                  with A&M's curated collection of fashion-forward essentials.
                </p>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="buy__button"
                >
                  <Link to="/shop">Shop Now</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>

        

      </section>
      <Services />
      <section className="colourit">
      <Container >
      <Col lg="12" className="text-center">
              <h2 className="section__title coltex">Shop by Category</h2>
            </Col>
          <Row >
          
          <Col lg='12' className="feature">
          <Link to={"/unstitched"}>
          <Col lg='2'>
            <div class="fe-box">
            <img src={unstitched} alt=""/>
            <h6>unstitched</h6>
        </div></Col></Link>
        <Link to={"/stitched"}>
        <Col lg='2'>
            <div class="fe-box">
            <img src={readymade} alt=""/>
            <h6>Ready Made</h6>
        </div></Col></Link>
        <Link to={"/saree"}>
        <Col lg='2'>
            <div class="fe-box">
            <img src={saree} alt=""/>
            <h6>Saree</h6>
        </div></Col></Link>
        <Link to={"/gown"}>
            <Col lg='2'>
            <div class="fe-box">
            <img src={gown} alt=""/>
            <h6>Gowns</h6>
        </div></Col></Link>
        <Link to={"/sharara"}>
            <Col lg='2'>
            <div class="fe-box">
            <img src={sharara} alt=""/>
            <h6>Sharara</h6>
        </div></Col></Link>
        <Link to={"/lehanga"}>
        <Col lg='2'>
            <div class="fe-box">
            <img src={lehanga} alt=""/>
            <h6>Lehanga</h6>
        </div></Col></Link>
        
        
        
        
        
        </Col>  
          </Row>
        </Container>
        </section>
      
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductsList data={trendingProducts} />
              
            )}
          </Row>
        </Container>
       
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock_top-content">
                <h4 className="text-black fs-6 mb-2 text-center">Limited Offer</h4>
                <h3 className="text-black fs-3 mb-2 per">
                  12% off on all products
                </h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__button store__btn mt-5"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            
            <Col lg="6" md="12" className="text-end counter__img">
              
            </Col>
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>
      
    </Helmet>
  );
};

export default Home;
