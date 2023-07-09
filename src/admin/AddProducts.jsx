import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterSubCategory, setEnterSubCategory] = useState('');
  const [enterNewArrival, setEnterNewArrival] = useState('');
  const [enterTrending, setEnterTrending] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterMainImg, setEnterMainImg] = useState(null);
  const [enterProductImgs, setEnterProductImgs] = useState([]);
  const [enterSizeSelectorRequired, setEnterSizeSelectorRequired] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]); // Added state for available sizes
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Define the sub-category options based on the selected category
  const subCategoryOptions = {
    Saree: ['Cotton', 'Georgette', 'Banarasi', 'Organza', 'Chiffon', 'Silk', 'Ready to wear'],
    'Unstitched Dress Material': ['Pure Cotton', 'Pure Lawn', 'Georgette', 'Organza', 'Silk'],
    'Stitched Dress material': ['Cotton', 'Georgette', 'Organza'],
    'Readymade kurti': ['Straight Shirt', 'Anarkali'],
    Gowns: ['Semi-stitched', 'Ready-made'],
    Sharara: ['Semi-stitched', 'Ready-made'],
    Lehangas: ['Bridemaid', 'Bridal'],
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, 'products');

      // Upload the main image
      const mainImage = enterMainImg;
      const mainImageRef = ref(storage, `productImages/${Date.now() + mainImage.name}`);
      const mainImageUploadTask = uploadBytesResumable(mainImageRef, mainImage);

      // Wait for the main image to be uploaded and get its download URL
      const mainImageSnapshot = await mainImageUploadTask;
      const mainImageDownloadURL = await getDownloadURL(mainImageSnapshot.ref);

      // Loop through each selected image and upload it
      const imageUrls = [];
      for (let i = 0; i < enterProductImgs.length; i++) {
        const image = enterProductImgs[i];
        const storageRef = ref(storage, `productImages/${Date.now() + image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Wait for the image to be uploaded and get its download URL
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }

      // Add the product with the image URLs and available sizes to the database
      await addDoc(docRef, {
        title: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        subCategory: enterSubCategory, // Add the selected sub-category
        New: enterNewArrival,
        Trending: enterTrending,
        price: enterPrice,
        imgUrl: mainImageDownloadURL,
        imgUrls: imageUrls, // Store the array of image URLs
        sizeSelectorRequired: enterSizeSelectorRequired, // Add the size chart requirement
        availableSizes: enterSizeSelectorRequired === 'Yes' ? availableSizes : [], // Add the available sizes if size chart is required
      });

      setLoading(false);
      toast.success('Product added successfully');
      navigate('/resplendent90/all-products');
    } catch (err) {
      setLoading(false);
      toast.error('Product not added');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {loading ? (
              <h4 className='py-5'>Loading...</h4>
            ) : (
              <>
                <h4 className='mb-5'>Add Products</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className='form__group'>
                    <span>Product title</span>
                    <input
                      type='text'
                      placeholder='title'
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <span>Short description</span>
                    <input
                      type='text'
                      placeholder='short description'
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <span>Description</span>
                    <textarea
                      type='text'
                      placeholder='description'
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className='form__group w-25'>
                    <span>Price</span>
                    <input
                      type='number'
                      placeholder='price'
                      value={enterPrice}
                      onChange={(e) => setEnterPrice(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className='form__group w-25'>
                    <span>Category</span>
                    <select
                      className='w-100 p-2'
                      value={enterCategory}
                      onChange={(e) => {
                        setEnterCategory(e.target.value);
                        setEnterSubCategory(''); // Reset the sub-category when the category changes
                      }}
                      required
                    >
                      <option value=''>Choose category</option>
                      <option value='Saree'>Saree</option>
                      <option value='Unstitched Dress Material'>Unstitched Dress Material</option>
                      <option value='Stitched Dress Material'>Stitched dress material</option>
                      <option value='Readymade kurti'>Readymade kurti</option>
                      <option value='Gowns'>Gowns</option>
                      <option value='Sharara'>Sharara</option>
                      <option value='Lehangas'>Lehangas</option>
                    </select>
                  </FormGroup>

                  {enterCategory && (
                    <FormGroup className='form__group w-25'>
                      <span>Sub-category</span>
                      <select
                        className='w-100 p-2'
                        value={enterSubCategory}
                        onChange={(e) => setEnterSubCategory(e.target.value)}
                        required
                      >
                        <option value=''>Choose sub-category</option>
                        {subCategoryOptions[enterCategory].map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  )}

                  <FormGroup className='form__group w-25'>
                    <span>New Arrival?</span>
                    <select
                      className='w-100 p-2'
                      value={enterNewArrival}
                      onChange={(e) => setEnterNewArrival(e.target.value)}
                    >
                      <option value='Choose'>Choose</option>
                      <option value='Yes'>Yes</option>
                      <option value='No'>No</option>
                    </select>
                  </FormGroup>

                  <FormGroup className='form__group w-25 '>
                    <span>Trending?</span>
                    <select
                      className='w-100 p-2'
                      value={enterTrending}
                      onChange={(e) => setEnterTrending(e.target.value)}
                    >
                      <option value='Choose'>Choose</option>
                      <option value='No'>No</option>
                      <option value='Yes'>Yes</option>
                    </select>
                  </FormGroup>

                  <FormGroup className='form__group w-25 '>
                    <span>Size Selector Required?</span>
                    <select
                      className='w-100 p-2'
                      value={enterSizeSelectorRequired}
                      onChange={(e) => setEnterSizeSelectorRequired(e.target.value)}
                    >
                      <option value='Choose'>Choose</option>
                      <option value='No'>No</option>
                      <option value='Yes'>Yes</option>
                    </select>
                  </FormGroup>

                  {enterSizeSelectorRequired === 'Yes' && (
                    <FormGroup className='form__group'>
                      <span>Available Sizes (separate the available sizes with comma " , ")</span>
                      <input
                        type='text'
                        value={availableSizes}
                        onChange={(e) => setAvailableSizes(e.target.value.split(','))}
                        required
                      />
                    </FormGroup>
                  )}

                  <FormGroup className='form__group'>
                    <span>Main Image (Add single Images)</span>
                    <input
                      type='file'
                      onChange={(e) => setEnterMainImg(e.target.files[0])}
                      accept='image/png, image/jpeg, image/jpg'
                      required
                    />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <span>Product Images (Add multiple Images)</span>
                    <input
                      type='file'
                      onChange={(e) => setEnterProductImgs([...e.target.files])}
                      accept='image/png, image/jpeg, image/jpg'
                      multiple
                    />
                  </FormGroup>

                  <button className='buy__button' type='submit'>
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
