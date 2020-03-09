import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";
import { useState } from "react";

const ProductForm = ({ addProduct, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prouductPrice: "",
    quantity: ""
  });
  const [productImg, setProductImg] = useState("");
  const [productImgName, setProductImgName] = useState("Choose File");
  const { title, description, productPrice, quantity } = formData;
  const onchange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImgChange = e => {
    setProductImg(e.target.files[0]);
    setProductImgName(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    productData.append("prouductPrice", productPrice);
    productData.append("quantity", quantity);
    productData.append("productImg", productImg, productImgName);
    addProduct(productData);
    console.log(productData);
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add a Product...</h3>
      </div>
      <form
        className='form'
        onSubmit={e => onSubmit(e)}
        encType='multipart/form-data'
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={e => onchange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='description'
            name='description'
            value={description}
            onChange={e => onchange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='quantity'
            name='quantity'
            value={quantity}
            onChange={e => onchange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='price'
            name='productPrice'
            value={productPrice}
            onChange={e => onchange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='file'
            name='productImg'
            multiple
            onChange={e => {
              onImgChange(e);
            }}
          />
        </div>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(ProductForm);
