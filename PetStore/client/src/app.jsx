import {BrowserRouter, Route , Routes} from "react-router-dom"
import React from 'react';
import Home from "./components/00_home.jsx"
import ClientLogin from "./components/01_client_login.jsx";
import ClientRegister from "./components/02_client_register.jsx";
import ClientStore from "./components/03_client_store.jsx";
import ClientUi from "./components/0002_client_ui.jsx";
import ClientCart from "./components/04_client_cart.jsx";
import ClientProfile from "./components/06_client_profile.jsx";
import AdminLogin from "./components/07_admin_login.jsx";
import AdminStore from "./components/08_admin_store.jsx";
import AdminAddProduct from "./components/09_admin_add_product.jsx";
import AdminProductDetails from "./components/10_admin_product_details.jsx";
import AdminOrders from "./components/11_admin_orders.jsx";
import AdminOrderDetails from "./components/12_admin_order_details.jsx";
import ClientView from "./components/006_client_profile_view.jsx";
import ClientEdit from "./components/006_client_profile-edit.jsx";
import AdminUi from "./components/0007_admin_ui.jsx";
import { ContextProvider } from "./components/auth.jsx";
import  RequireAuth  from "./components/requireAuth.jsx";

function App(){
    return ( 
<BrowserRouter>
<ContextProvider>
    <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/client_login" element={<ClientLogin/> } />
        <Route path="/client_register" element={<ClientRegister/> } />
        <Route path="/client" element={<RequireAuth><ClientUi/></RequireAuth> }>
            <Route index element={<RequireAuth><ClientStore/></RequireAuth> }/>
            <Route path="store" element={<RequireAuth><ClientStore/></RequireAuth> } />
            <Route path="cart" element={<RequireAuth><ClientCart/></RequireAuth> } />
            <Route path="profile" element={<RequireAuth><ClientProfile/></RequireAuth> } >
                <Route index element={<RequireAuth><ClientView/></RequireAuth> }/>
                <Route path="view" element={<RequireAuth><ClientView/></RequireAuth> } />
                <Route path="edit" element={<RequireAuth><ClientEdit/></RequireAuth> } />
            </Route>
        </Route>
        <Route path="/admin_login" element={<AdminLogin/> } />
        <Route path="/admin" element={<AdminUi/> } >
            <Route index element={<AdminStore/> }/>
            <Route path="store" element={<AdminStore/> } />
            <Route path="add_product" element={<AdminAddProduct/> } />
            <Route path="product_details/:idproduct" element={<AdminProductDetails/> } />
            <Route path="orders" element={<AdminOrders/> } />
            <Route path="order_details" element={<AdminOrderDetails/> } />
        </Route>
    </Routes>
    </ContextProvider>
</BrowserRouter>
)}

export default App