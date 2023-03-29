import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';



function StripeCheckout({products,setReload=f=>f}) {


    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () =>{
        let amount = 0;
        products.map((p)=>{
            amount = amount + p.price;
        });
        return amount;
    }

    const showStripeButton = () =>{
        return isAuthenticated() ? (<button className='btn btn-success'>Pay With Stripe</button>) : <Link to="/signin">
            <button className='btn btn-warning'>Sign In to continue payment</button>
        </Link>
    }

  return (
    <div>
        <h3>StripeCheckout {getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
}

export default StripeCheckout;
