import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import ProductsList from "../components/UI/ProductsList";

const Saree = () => {
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
    <Helmet title="Saree">
      <CommonSection title="Saree" />

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
                  <option value="cotton">Cotton</option>
                  <option value="georgette">Georgette</option>
                  <option value="banarasi">Banarasi</option>
                  <option value="organza">Organza</option>
                  <option value="chiffon">Chiffon</option>
                  <option value="silk">Silk</option> Ready to wear
                  <option value="Ready to wear">Ready to wear</option> 
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

export default Saree;
