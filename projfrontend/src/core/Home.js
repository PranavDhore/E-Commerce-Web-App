import {React,useEffect,useState} from 'react'
import "../style.css";

import {API} from "../Backend"
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';




export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () =>{
      getProducts().then(data=>{
        if(data.error){
          setError(data.error)
        }else{
          setProducts(data);
        }
      })
    }

    useEffect(()=>{
      loadAllProduct();
    },[])

    console.log("API IS : ",process.env.REACT_APP_BACKEND)

  return (
    <Base title='Home Page' description='Welcome to Online T-shirt Store'>
        <div className='row'>
          <h1 className='text-white'>All of T-shirts</h1>
          {products.map((product,index)=>{
            return (
              <div key={index} className='col-4 mb-4'>
                <Card product={product} />
              </div>
            )
          })}
        </div>
    </Base>
  )
}
