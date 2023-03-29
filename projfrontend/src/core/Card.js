import { useState } from "react";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./ImageHelper";


const Card = ({
    product,addtoCart = true,removeFromCart=false,setReload = f => f,reload=undefined
}) => {


    const [redirect,setRedirect] = useState(false);
    // const [redirect,setRedirect] = useState(false);

    const addToCart = () =>{
        addItemToCart(product,()=>{
            setRedirect(true);
        })
    }

    const getARedirect = (redirect) =>{
        if(redirect){
            return <Navigate to="/cart" />
        }
    }

    const cardTitle = product ? product.name : "Product Title";
    const cardDescription = product ? product.description : "Product Description";
    const cardPrice = product ? product.price : "Product Price";

    console.log(product);
    const showAddToCart = (addtoCart) =>{

        return (addtoCart && (
            <div class="d-grid gap-2">
                    <button onClick={()=>{addToCart()}} class="btn btn-outline-success" type="button">Add to cart</button>
                    
            </div>
        ))

    }

    const showRemoveFromCart = (removeFromCart) =>{

        return (
            removeFromCart && (
                <div class="d-grid gap-2">
                    <button onClick={()=>{removeItemFromCart(product._id); setReload(!reload)}} class="btn btn-outline-warning" type="button">Remove from cart</button>
                    
                </div>
            )
        )

    }

    return (
        
      <div className="card text-white bg-dark ">
        <div className="card-header lead fw-semibold">{cardTitle}</div>
        <div className="card-body">
            {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
          <div className="row">
            <div className="col-12">
                {showAddToCart(addtoCart)}
            </div>
            <div className="col-12 mt-3">
                {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;