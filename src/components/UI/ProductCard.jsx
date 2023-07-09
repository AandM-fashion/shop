import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { favActions } from '../../redux/slices/favSlice';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    const newItem = {
      id: item.id,
        title: item.title,
        price: item.price,
        imgUrl: item.imgUrl,
      quantity: 1,
    };
  
    dispatch(cartActions.addItem(newItem));
  
    toast.success("Product added successfully");
  };

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success('Product Added to Favorites');
  };

  return (
    <Col lg='3' md='4' className='mb-2'>
      <div className='product__item'>
        <Link to={`/shop/${item.id}`}>
          <div className='product__img'>
            <motion.img  whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt=""
              style={{ height: 400
              , objectFit: 'contain'}}/>
          </div>
        </Link>
        <div className='p-2 product__info'>
          <Link to={`/shop/${item.id}`}>
            <h3 className='product__name'>{item.title}</h3>
          </Link>
          <span>{item.category}</span>
        </div>
        <div className='product__card-bottom d-flex align-items-center justify-content-between p-2'>
          <span className='price'>Rs.{item.price}</span>
          <motion.span
            className='h_a'
            whileHover={{ scale: 1.2 }}
            onClick={addToFavorites}
          >
            <i className='helo ri-heart-add-line'></i>
          </motion.span>
          <motion.span className='' whileHover={{ scale: 1.2 }} onClick={addToCart}>
            <i className='ri-add-line'></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
