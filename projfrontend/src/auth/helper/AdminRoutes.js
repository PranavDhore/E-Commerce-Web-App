import React from "react";
import {Navigate, Route,useNavigate} from "react-router-dom";

import { isAuthenticated } from "./index";

const AdminRoutes = ({children}) =>{

    const auth = isAuthenticated();
    
  
    return auth && auth.user.role ===1 ? children : <Navigate to="/" />

}

export default AdminRoutes;