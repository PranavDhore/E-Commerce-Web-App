import {React,useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {signup} from '../auth/helper/index';

function Signup() {

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    const {name,email,password,error,success} = user;

    const handleChange = (key,event) =>{
        setUser({...user,error:false,[key]:event.target.value});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setUser({...user,error:false});
        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setUser({...user,error:data.error,success:false});
            }else{
                setUser({name:"",email:"",password:"",error:"",success:true});
            }
        })
        .catch(console.log("Error in Sign Up"));


    }

    const signUpForm = () =>{
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Name</label>
                            <input onChange={(e)=>{handleChange("name",e)}} value={name} className='form-control' type="text" />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input onChange={(e)=>{handleChange("email",e)}} value={email} className='form-control' type="email" />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input onChange={(e)=>{handleChange("password",e)}} value={password} className='form-control' type="password" />
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto mt-4">
                            <button onClick={handleSubmit} className="btn btn-success" type="button">Sign Up</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    const successMessage = () =>{
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-success' style={{display:success? "" : "none"}}>
                        New Account Created Successfully. Please <Link to="/signin">Login here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () =>{
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-danger' style={{display:error? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <Base title='Signup Page' description='A Page for user to signup'>
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        {/* <p className='text-center text-white'>{JSON.stringify(user)}</p> */}
    </Base>
  )
}

export default Signup;
