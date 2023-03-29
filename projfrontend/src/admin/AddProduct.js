import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getCategories } from './helper/adminapicall';


function AddProduct() {

    const [values,setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect:false,
        formData:""
    });
    // const [error,setError] = useState(false);
    // const [success,setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const {name,description,price,stock,categories,category,loading,error,createdProduct,getRedirect,formData} = values;

    const preload = () =>{
        getCategories().then(data=>{
            if(data.error){
                setValues({
                    ...values,error:data.error
                })
            }else{
                setValues({
                    ...values,categories:data,formData:new FormData()
                })
                console.log(categories);
            }
        })
    }


    useEffect(()=>{
        preload()
    },[]);

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group my-3">
            <label className="btn btn-block btn-success">
              <input
                className='form-control'
                onChange={(e)=>{handleChange(e,"photo")}}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group my-3">
            <input
              
              onChange={(e)=>{handleChange(e,"name")}}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group my-3">
            <textarea
              onChange={(e)=>{handleChange(e,"description")}}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group my-3">
            <input
              onChange={(e)=>{handleChange(e,"price")}}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group my-3">
            <select
              onChange={(e)=>{handleChange(e,"category")}}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index)=>{
                return <option value={cate._id} key={index}>{cate.name}</option>
              })}
           
            </select>
          </div>
          <div className="form-group my-3">
            <input
              onChange={(e)=>{handleChange(e,"stock")}}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-3">
            Create Product
          </button>
        </form>
      );


      const handleChange = (e,name) =>{
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name,value);
        setValues({...values, [name]:value})


      }

      const successMessage = () =>{
        return(
            <div className='alert alert-success mt-3' style={{display:createdProduct? "" : "none"}}>
                <h4>{createProduct} created Succefully</h4>
            </div>
        )

      }

      const errorMessage = () =>{
        if(error){
            return (
                <div className='alert alert-success mt-3'>
                    <h4>Unable To Create Product</h4>
                </div>
            )
        }
        
      }
      
      const onSubmit = (e) =>{
        e.preventDefault();
        setValues({...values,error:"",loading:true})
        createProduct(user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    price:"",
                    photo:"",
                    stock:"",
                    loading:false,
                    createdProduct:data.name
                })
            }
        })
      }


  return (
    <Base title='Add Products' description='Welcome to Create Product Creation Section' className='container bg-success p-3'>
        <Link to="/admin/dashboard" className="btn btn-md btn-outline-info mb-3">Admin Home</Link>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2'>
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
            </div>
        </div>
    </Base>
  )
}

export default AddProduct;
