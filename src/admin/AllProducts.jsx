import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData'
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../styles/cart.css'
import { NavLink, useNavigate } from "react-router-dom";

const AllProducts = () => {

  const { data: productsData, loading } = useGetData('products')
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    
    toast.success('Product Deleted')
  }
  const addnew =()=>{
    navigate('/resplendent90/add-products?')
  };

  return (
    <section>
      <Container>
        <Row>
          <button onClick={addnew} className='buy__button'>add new product</button>
          <Col lg='12'>
            <section className='cart'><table width="100%" className='table cart'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <h3>Loading...</h3> :
                    productsData.map(item => (
                      <tr key={item.id}>
                        <td><img src={item.imgUrl} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>Rs.{item.price}</td>
                        <td>
                          <Link to={`/resplendent90/edit-product/${item.id}`} className='btn btn-primary'>Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => { deleteProduct(item.id) }} className='btn btn-danger'>Delete</button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table></section>
            
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts;
