import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from '../redux/slices/cartSlice';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { db, auth } from "../firebase.config";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { favActions } from "../redux/slices/favSlice";

const Cart = () => {
  const cartItems = useSelector((state) =>
    state.cart.cartItems.map((item) => ({ ...item, size: item.size || "" }))
  );

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const moveItemToFav = (item) => {
    dispatch(favActions.addItem(item));
    dispatch(cartActions.deleteItem(item.id));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const fetchCartItems = async () => {
      try {
        const cartRef = doc(db, "users", user.uid);
        const cartSnapshot = await getCartSnapshot(cartRef);
        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          const cartItemsWithSizeRequired = cartData.cart.map((item) => ({
            ...item,
            id: `${item.id}-${item.size}`, // Include size in the item ID
            sizeRequired: item.sizeRequired === "Yes",
          }));
          dispatch(cartActions.setCartItems(cartItemsWithSizeRequired));
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), () => {
      fetchCartItems();
    });

    fetchCartItems();

    return () => unsubscribe();
  }, []);

  const getCartSnapshot = async (cartRef) => {
    try {
      const cartSnapshot = await getDoc(cartRef);
      return cartSnapshot;
    } catch (error) {
      console.error("Error getting cart snapshot:", error);
    }
  };

  const incrementQuantity = (itemId) => {
    dispatch(cartActions.incrementQuantity(itemId));
  };

  const decrementQuantity = (itemId) => {
    dispatch(cartActions.decrementQuantity(itemId));
  };

  const deleteProduct = (itemId) => {
    dispatch(cartActions.deleteItem(itemId));
  };

  return (
    <Helmet title="cart">
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col className='carttable' lg='8'>
              {cartItems.length === 0 ? (
                <div className='justify cartbox'>
                  <h2 className="fs-4 text-center">No items added to the cart</h2>
                  <p className="text-center mt-5">Embark on a shopping adventure and fill your cart with exquisite treasures</p>
                </div>
              ) : (
                <section className='cart'>
                  <table width="100%" className="table bordered">
                    <thead>
                      <tr>
                        <th className="text-center">Image</th>
                        <th className=" text-center">Title</th>
                        <th className=" text-center">Price</th>
                        <th className="text-center">Qty</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Move to wishlist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <Tr
                          item={item}
                          key={index}
                          incrementQuantity={incrementQuantity}
                          decrementQuantity={decrementQuantity}
                          deleteProduct={deleteProduct}
                          moveItemToFav={moveItemToFav}
                        />
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
            </Col>
            <Col className='pt-500' lg='3'>
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal <span className="fs-4 fw-bold">Rs.{totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">taxes and shipping will be calculated during checkout</p>
              <div>
                {cartItems.length === 0 ? (
                  <button className="buy__buttonn w-100 ">Proceed to Checkout</button>
                ) : (
                  <Link to='/checkout'><button className="buy__button w-100 ">Proceed to Checkout</button></Link>
                )}
                <Link to='/shop'><button className="buy__button w-100 mt-3">Continue Shopping</button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item, incrementQuantity, decrementQuantity, deleteProduct, moveItemToFav }) => {
  return (
    <tr>
      <td className="text-center">
        <Link to={`/shop/${item.id.split("-")[0]}`}>
          <img src={item.imgUrl} alt="" />
        </Link>
      </td>
      <td className="text-center">
        <Link to={`/shop/${item.id.split("-")[0]}`}>{item.title}</Link>
        {item.size && <span>({item.size})</span>}
      </td>
      <td className="text-center">Rs.{item.price}</td>
      <td>
        <div className="quantity">
          <a
            className="quantity__minus"
            onClick={() => decrementQuantity(item.id)}
          >
            -
          </a>
          <span className="quantity__input">{item.quantity}</span>
          <a
            className="quantity__plus"
            onClick={() => incrementQuantity(item.id)}
          >
            +
          </a>
        </div>
      </td>
      <td className="text-center">
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={() => deleteProduct(item.id)}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
      <td className="text-center">
        <i onClick={() => moveItemToFav(item)} className="ri-heart-3-fill ml-5 text-center"></i>
      </td>
    </tr>
  );
};

export default Cart;
