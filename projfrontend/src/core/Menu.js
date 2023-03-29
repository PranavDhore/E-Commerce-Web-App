import {React,Fragment} from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom";
import { isAuthenticated, signout } from '../auth/helper';



const currentTab = (history,path) =>{
    if(history.pathname === path){
        return {color:"#2eec72"}
    }else{
        return {color:"#ffffff"}
    }
}

function Menu() {

    const history = useLocation();
    let navigate = useNavigate();
    // console.log(history)

  return (
    <div>
        <ul className='nav nav-tabs '>
            <li className='nav-item'>
                <Link style={currentTab(history,"/")} className='nav-link' to="/">
                    Home
                </Link>
            </li>
            <li className='nav-item'>
                <Link style={currentTab(history,"/cart")} className='nav-link' to="/cart">
                    Cart
                </Link>
            </li>
           {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
                <Link style={currentTab(history,"/user/dashboard")} className='nav-link' to="/user/dashboard">
                    User Dashboard
                </Link>
            </li>
           )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-item'>
                <Link style={currentTab(history,"/admin/dashboard")} className='nav-link' to="/admin/dashboard">
                    Admin Dashboard
                </Link>
            </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                <li className='nav-item'>
                    <Link style={currentTab(history,"/signup")} className='nav-link' to="/signup">
                        Sign Up
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link style={currentTab(history,"/signin")} className='nav-link' to="/signin">
                        Sign In
                    </Link>
                </li>
            </Fragment>
            )}
                       
            
            {isAuthenticated() && (<li className='nav-item'>
                <span className='nav-link text-warning' onClick={()=>{signout(()=>{navigate("/")})}}>
                    Signout
                </span>
            </li>)}
        </ul>
    </div>
  )
}

export default Menu;
