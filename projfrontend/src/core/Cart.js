import {React,useEffect,useState} from 'react'
import "../style.css";

import {API} from "../Backend"
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';




export default function Cart() {

    const [products,setProducts] = useState([]);
    const [reload,setReload] = useState(false);


    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts = () =>{
        return(
            <div>
                
                {products.map((product,index)=>{
                    return(<Card key={index} product={product} removeFromCart={true} addtoCart={false} setReload={setReload} reload={reload} />)
                    
                })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h2>This section is to for products Checkout</h2>
            </div>
        )
    }

  return (
    <Base title='Cart Page' description='Checkout Page'>
        <div className='row'>
          <div className='col-4'>
            {loadAllProducts()}
          </div>
          <div className='col-8'>
            <StripeCheckout products={products} setReload={setReload} />
          </div>
          
        </div>
    </Base>
  )
}
