import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';



export default function RoutesApp() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/signup' exact element={<Signup />} />
            <Route path='/signin' exact element={<Signin />} />
            <Route path='/cart' exact element={<Cart />} />
            <Route path='/user/dashboard' exact element={
            <PrivateRoutes>
              <UserDashboard />
            </PrivateRoutes>} />
            
            <Route path='/admin/dashboard' exact element={
              <AdminRoutes>
              <AdminDashboard />
            </AdminRoutes>
            
            }  />
            <Route path='/admin/create/category' exact element={
              <AdminRoutes>
                <AddCategory />
              </AdminRoutes>
            
            }  />
            <Route path='/admin/categories' exact element={
              <AdminRoutes>
                <ManageCategories />
              </AdminRoutes>
            
            }  />
            <Route path='/admin/create/product' exact element={
              <AdminRoutes>
                <AddProduct />
              </AdminRoutes>
            
            }  />
            <Route path='/admin/products' exact element={
            <AdminRoutes>
              <ManageProducts />
            </AdminRoutes>
          
          }  />
          <Route path='/admin/product/update/:productId' exact element={
            <AdminRoutes>
              <UpdateProduct  />
            </AdminRoutes>
          
          }  />
        </Routes>
    </BrowserRouter>
  )
}
