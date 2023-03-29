import React from "react";
import {Navigate, Route,useNavigate} from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoutes = ({children}) =>{

    const auth = isAuthenticated();

    return auth ? children : <Navigate to="/" />

}

export default PrivateRoutes;