import {React,useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';



function AddCategory() {


    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    
    const {user, token} = isAuthenticated();

    const goBack = () =>{
        return(
            <div className='mt-3'>
                <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
            </div>
        )
        
    }

    const handleChange = (e) =>{
        setError("");
        setName(e.target.value);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        setError("");
        setSuccess(false)
        createCategory(user._id,token,{name})
            .then(data=>{
                if(data.error){
                    setError(true)
                }else{
                    setError("")
                    setSuccess(true);
                    setName("");
                }
            })
    }

    const successMessage = () =>{

        if(success){
            return(
                <h4 className='text-success'>Succefully Created Category</h4>
            )
        }

    }

    const warningMessage = () =>{

        if(error){
            return(
                <h4 className='text-danger'>Failed To Create Category</h4>
            )
        }

    }

    const myCategoryForm = () =>{
        return (
            <form>
                <div className='form-group'>
                    <p className='lead'>Enter the category</p>
                    <input type='text' value={name} onChange={handleChange} className='form-control my-3' required placeholder='For Ex. Summer'  />
                    <button onClick={onSubmit} className='btn btn-outline-success'>Create Category</button>
                </div>
            </form>
        )
    }

  return (
    <Base title='Create Category Here' description='Add New Category For New T-Shirts' className='container bg-success p-4'>
        <div className='row bg-white rounded  p-2'>
            <div className='col-md-8 offset-md-2'>
                {successMessage()}
                {warningMessage()}
                {goBack()}
                {myCategoryForm()}
                
            </div>
        </div>
    </Base>
  )
}

export default AddCategory;
