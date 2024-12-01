import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const url = "https://e-commerce-backend-8s1b.onrender.com";

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    brand: "",
    stock: "",
    tags: "",
  });


  const styles = {
    pageContainer: {
      background: 'linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    form: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    formTitle: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: 'bold'
    },
    imageUploadContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    imageUploadLabel: {
      cursor: 'pointer',
      width: '250px',
      height: '250px',
      border: '3px dashed #3498db',
      borderRadius: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    imageUploadLabelHover: {
      borderColor: '#2980b9',
      transform: 'scale(1.05)'
    },
    uploadedImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#2c3e50',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #bdc3c7',
      fontSize: '16px',
      transition: 'all 0.3s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px'
    },
    submitButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    submitButtonHover: {
      backgroundColor: '#2980b9'
    }
  };


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("stock", Number(data.stock));
    formData.append("tags", data.tags);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/products/add`, formData);
      console.log(response.data);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Electronics",
          brand: "",
          stock: "",
          tags: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div style={styles.pageContainer}>
    <form 
      onSubmit={onSubmitHandler} 
      style={styles.form}
    >
      <h2 style={styles.formTitle}>Add New Product</h2>

      {/* Image Upload */}
      <div style={styles.imageUploadContainer}>
        <label 
          htmlFor="image"
          style={{
            ...styles.imageUploadLabel,
            ...(image ? {} : styles.imageUploadLabelHover)
          }}
        >
          {image ? (
            <img 
              src={URL.createObjectURL(image)} 
              alt="Uploaded" 
              style={styles.uploadedImage}
            />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#3498db'
            }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M10 14l2-2 2 2" />
                <path d="M12 12v6" />
                <path d="M20.13 16.36a8 8 0 0 0-13.13-7.36" />
              </svg>
              <p style={{ marginTop: '10px' }}>Click to upload image</p>
            </div>
          )}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            style={{ display: 'none' }}
            required
          />
        </label>
      </div>

      {/* Product Name */}
      <div style={{ marginBottom: '20px' }}>
        <label style={styles.inputLabel}>Product Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Enter product name"
          style={{
            ...styles.input,
            ':focus': styles.inputFocus
          }}
          required
        />
      </div>

      {/* Product Description */}
      <div style={{ marginBottom: '20px' }}>
        <label style={styles.inputLabel}>Product Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Describe your product"
          rows="4"
          style={{
            ...styles.input,
            resize: 'vertical'
          }}
          required
        ></textarea>
      </div>

      {/* Category and Price */}
      <div style={styles.gridContainer}>
        <div>
          <label style={styles.inputLabel}>Product Category</label>
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
            style={{
              ...styles.input,
              ':focus': styles.inputFocus
            }}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>
        <div>
          <label style={styles.inputLabel}>Product Price</label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#7f8c8d'
            }}>$</span>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Price"
              style={{
                ...styles.input,
                paddingLeft: '25px',
                ':focus': styles.inputFocus
              }}
              required
            />
          </div>
        </div>
      </div>

      {/* Brand and Stock */}
      <div style={styles.gridContainer}>
        <div>
          <label style={styles.inputLabel}>Product Brand</label>
          <input
            type="text"
            name="brand"
            value={data.brand}
            onChange={onChangeHandler}
            placeholder="Brand name"
            style={{
              ...styles.input,
              ':focus': styles.inputFocus
            }}
            required
          />
        </div>
        <div>
          <label style={styles.inputLabel}>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={onChangeHandler}
            placeholder="Available stock"
            style={{
              ...styles.input,
              ':focus': styles.inputFocus
            }}
            required
          />
        </div>
      </div>

      {/* Tags */}
      <div style={{ marginBottom: '20px' }}>
        <label style={styles.inputLabel}>Product Tags</label>
        <input
          type="text"
          name="tags"
          value={data.tags}
          onChange={onChangeHandler}
          placeholder="e.g., electronics, gadgets"
          style={{
            ...styles.input,
            ':focus': styles.inputFocus
          }}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        style={{
          ...styles.submitButton,
          ':hover': styles.submitButtonHover
        }}
      >
        Add Product
      </button>
    </form>
  </div>
  );
};

export default AddProduct;
