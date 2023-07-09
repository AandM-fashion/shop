import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/cart.css'
import { motion } from "framer-motion";
import { favActions } from "../redux/slices/favSlice";
import { cartActions } from "../redux/slices/cartSlice";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";

const Fav = () => {
  const favItems = useSelector((state) => state.fav.favItems);
  const totalAmount = useSelector((state) => state.fav.totalAmount);

  const dispatch = useDispatch();

  const deleteItem = (itemId) => {
    dispatch(favActions.deleteItem(itemId));
  };

  const moveItemToCart = (item) => {
    dispatch(cartActions.addItem(item));
    dispatch(favActions.deleteItem(item.id));
  };

  return (
    <Helmet title="Favourites">
      <CommonSection title="Favourites" />
      <section>
        <Container>
          <Row>
            <Col className='carttable' lg="12">
              {favItems.length === 0 ? (
                <section><h2 className="fs-4 text-center">
                  Nothing seem to be here <i class="ri-emotion-sad-line"></i>
                </h2><p className="text-center mt-5">Create a curated collection of your most cherished finds and let them dance in the realm of your favorites.</p></section>
              ) : (
                <section className='cart'><table className="table bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Delete</th>
                      <th className="text-center">Move to Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favItems.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">
                          <Link to={`/shop/${item.id}`}>
                            <img src={item.imgUrl} alt="" />
                          </Link>
                        </td>
                        <td className="text-center">
                          <Link to={`/shop/${item.id}`}>{item.title}</Link>
                        </td>
                        <td className="text-center">Rs.{item.price}</td>
                        <td className="text-center">
                          <motion.i
                            whileTap={{ scale: 1.2 }}
                            onClick={() => deleteItem(item.id)}
                            className="ri-delete-bin-line"
                          ></motion.i>
                        </td>
                        <td className="text-center">
                            
                        <i onClick={() => moveItemToCart(item)} class="ri-shopping-cart-fill ml-5 text-center"></i>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></section>
                
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Fav;
