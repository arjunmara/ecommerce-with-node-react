import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";
import { useState } from "react";

const ProductForm = ({ addProduct, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productImg: "",
    prouductPrice: "",
    quantity: ""
  });
  const { title, description, productImg, productPrice, quantity } = formData;

  const onchange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    addProduct(formData, history);
  };
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Add a Product...</h3>
      </div>
      <form
        className='form'
        onSubmit={e => onSubmit(e)}
        enctype='multipart/form-data'
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
            placeholder='price'
            name='productImg'
            value={productImg}
            onChange={e => onchange(e)}
          />
        </div>

        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(ProductForm);
