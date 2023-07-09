import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import ProductsList from "../components/UI/ProductsList";

const Lehanga = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(products);
      setFilteredProducts(products);
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };

  const handleSubCategory = (e) => {
    const subCategory = e.target.value;
    setSelectedSubCategory(subCategory);
    applyFilters(subCategory);
  };

  const applyFilters = (subCategory) => {
    let filteredProducts = productsData;

    if (subCategory !== "") {
      filteredProducts = filteredProducts.filter(
        (item) => item.subCategory === subCategory
      );
    }

    setFilteredProducts(filteredProducts);
  };

  return (
    <Helmet title="Lehanga">
      <CommonSection title="Lehanga" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select
                  value={selectedSubCategory}
                  onChange={handleSubCategory}
                >
                  <option value="">Filter By Sub-Category</option>
                  <option value="bridemaid">Bridemaid</option>
                  <option value="bridal">Bridal</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {filteredProducts.length === 0 ? (
              <h1 className="text-center fs-4">No Products Found</h1>
            ) : (
              <ProductsList data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Lehanga;
