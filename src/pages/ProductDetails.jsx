import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { favActions } from "../redux/slices/favSlice";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../firebase.config";
import { getDocs, query, collection, where } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import ProductsList from "../components/UI/ProductsList";
import '../styles/product-details.css'
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const limit = 10; // Set the number of documents to fetch at once
  const { data: products, loading } = useGetData("products", limit);

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  

  const year = new Date().getFullYear();

  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No product found");
      }
    };

    fetchProduct();
  }, [id]);

  const {
    imgUrls,
    imgUrl,
    title,
    price,
    description,
    shortDesc,
    category,
    availableSizes
  } = product;

  const fetchAllProducts = async () => {
    const querySnapshot = await getDocs(query(collection(db, "products"), limit(8)));
    const allProducts = querySnapshot.docs.map((doc) => doc.data());
    return allProducts;
  };



  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.Trending === "Yes"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === product.category
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
  }, [products, product]);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
    };

    console.log(reviewObj);
    toast.success("Review Submitted");
  };

  const addToCart = () => {
    const newItem = {
      id,
      image: imgUrl,
      title,
      price,
      quantity: 1,
      size: selectedSize,
    };
  
    dispatch(cartActions.addItem(newItem));
  
    toast.success("Product added successfully");
  };
  

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id,
        title,
        price,
        imgUrl,
      })
    );
    toast.success('Product Added to Favorites');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const mrp = Math.floor(price / 0.88);

  

  



  return (
    <Helmet title={title}>
      <CommonSection title={title} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="5">
              <div className="img">
                <Slider {...settings}>
                  <div>
                    <img src={imgUrl} alt="" />
                  </div>
                  {imgUrls &&
                    imgUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} alt="" />
                      </div>
                    ))}
                </Slider>
              </div>
            </Col>

            <Col lg="7">
              <div className="product__details">
                <h2>{title}</h2>
                <div className="product__rating d-flex align-items-center gap-2 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">Rs.{price}</span>
                  <span>Category: {category}</span>
                </div>
                <div className="multiline">{description}</div>
                {availableSizes && availableSizes.length > 0 && (
  <div>
    <label htmlFor="sizeSelect">Select Size</label>
    <select
      id="sizeSelect"
      value={selectedSize}
      onChange={(e) => setSelectedSize(e.target.value)}
    >
      <option value="">Na</option>
      {availableSizes.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
)}


                <div className="d-flex align-items-center gap-5">
                  
                  <button className="buy__button w-100" onClick={addToCart}>
                    Add to Cart
                  </button>
                  <button className="buy__button fav_button small_button w-100" onClick={addToFavorites}>
                    <i class="ri-heart-add-line"></i>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p className="mt-3 mb-3 prod">{shortDesc}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            {bestSalesProducts && (
              <ProductsList data={bestSalesProducts} />
            )}
            <Col lg="12" className="mt-5">
              <h2 className="related__title">Also Buy</h2>
            </Col>
            {trendingProducts && (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
