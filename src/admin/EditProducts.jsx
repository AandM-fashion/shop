import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

const EditProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterNewArrival, setEnterNewArrival] = useState('');
  const [enterTrending, setEnterTrending] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImgs, setEnterProductImgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
          setEnterTitle(productSnapshot.data().title);
          setEnterShortDesc(productSnapshot.data().shortDesc);
          setEnterDescription(productSnapshot.data().description);
          setEnterCategory(productSnapshot.data().category);
          setEnterNewArrival(productSnapshot.data().New);
          setEnterTrending(productSnapshot.data().Trending);
          setEnterPrice(productSnapshot.data().price);
        } else {
          toast.error('Product not found');
          navigate('/resplendent90/all-products');
        }
      } catch (error) {
        toast.error('Error fetching product data');
        navigate('/resplendent90/all-products');
      }
    };

    getProductData();
  }, [id, navigate]);

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productRef = doc(db, 'products', id);

      // Loop through each selected image and upload it
      const imageUrls = [];
      for (let i = 0; i < enterProductImgs.length; i++) {
        const image = enterProductImgs[i];
        const storageRef = ref(
          storage,
          `productImages/${Date.now() + image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Wait for the image to be uploaded and get its download URL
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }

      // Update the product data in the database
      await updateDoc(productRef, {
        title: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        New: enterNewArrival,
        Trending: enterTrending,
        price: enterPrice,
        imgUrls: imageUrls, // Store the array of image URLs
      });

      setLoading(false);
      toast.success('Product updated successfully');
      navigate('/resplendent90/all-products');
    } catch (error) {
      setLoading(false);
      toast.error('Error updating product');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h1>Edit Product</h1>
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              product && (
                <Form onSubmit={updateProduct}>
                  <FormGroup>
                    <label>Title</label>
                    <input
                      type='text'
                      className='form-control'
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Short Description</label>
                    <input
                      type='text'
                      className='form-control'
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Description</label>
                    <textarea
                      className='form-control'
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Category</label>
                    <input
                      type='text'
                      className='form-control'
                      value={enterCategory}
                      onChange={(e) => setEnterCategory(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>New Arrival</label>
                    <input
                      type='text'
                      className='form-control'
                      value={enterNewArrival}
                      onChange={(e) => setEnterNewArrival(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Trending</label>
                    <input
                      type='text'
                      className='form-control'
                      value={enterTrending}
                      onChange={(e) => setEnterTrending(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Price</label>
                    <input
                      type='number'
                      className='form-control'
                      value={enterPrice}
                      onChange={(e) => setEnterPrice(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Product Images</label>
                    <input
                      type='file'
                      className='form-control'
                      multiple
                      onChange={(e) =>
                        setEnterProductImgs(e.target.files)
                      }
                    />
                  </FormGroup>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={loading}
                  >
                    Update Product
                  </button>
                </Form>
              )
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProducts;
