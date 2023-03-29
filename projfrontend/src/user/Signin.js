import {React,useState} from 'react';
import Base from '../core/Base';
import {Link,useNavigate} from 'react-router-dom';

import {signin,authenticate,isAuthenticated} from "../auth/helper/index";

function Signin() {

    let navigate = useNavigate();

    const [user,setUser] = useState({
        email:"",
        password:"",
        error:false,
        loading:false,
        didRedirect:false
    });

    const {email,password,error,loading,didRedirect} = user;

    const userData = isAuthenticated();

    const handleChange = (key,event) =>{
        setUser({...user,error:false,[key]:event.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setUser({...user,error:false,loading:true});
        signin({email,password})
        .then(data=>{
            if(data.error){
                setUser({...user,error:data.error,loading:false});
            }else{
                authenticate(data, ()=>{
                    setUser({...user,didRedirect:true})
                })
            }
        })
        .catch(console.log("Sign In Request Failed"));
    }

    const performRedirect = () =>{
        if(didRedirect){
            console.log(userData);
            if(userData && userData.user.role === 1){
                return navigate("/admin/dashboard")
            }else{
                return navigate("/user/dashboard")
            }

            
        }

        if(isAuthenticated()){
            navigate("/")
       }

        
    }

    const loadingMessage = () =>{
        return (
            loading && (
            <div className='alert alert-info'>
                <h2>Loading ...</h2>
            </div>)
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

    const signInForm = () =>{
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input onChange={(e)=>{handleChange("email",e)}} value={email} className='form-control' type="email" />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input onChange={(e)=>{handleChange("password",e)}} value={password} className='form-control' type="password" />
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto mt-4">
                            <button onClick={(e)=>{handleSubmit(e)}} className="btn btn-success" type="button">Sign In</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        )
    }

  return (
    <Base title='Signin Page' description='A Page for user to signin'>
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
    </Base>
  )
}

export default Signin;
