import { Navigate, Route, Routes } from 'react-router-dom';
import {
  PolicyPage, 
  HomePage, 
  AdminLayout, 
  MainLayout, 
  BlogPage, 
  BlogDetailsPage, 
  BlogAdminPage
}  from '../pages/index';

import LoginPage from '../pages/LoginPage';
import Products from '../pages/Products';
import RequireAuth from './RequireAuth';
import ProductAdmin from '../pages/PageProductAdmin/ProductAdmin'
import { useAuthStore } from '../context/authProvider';
import { useEffect } from 'react';

const Router = () => {
   const { initialize } = useAuthStore();
  
    useEffect(() => {
      initialize();
    }, [initialize]);

    return (
      <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/policity" element={<PolicyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogDetailsPage/>} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />  
          <Route element={ <RequireAuth/> }>
            <Route element={<AdminLayout />}>
              <Route path="/admin/panel/products" element={<ProductAdmin/>} />
              <Route path="/admin/panel/customers" element={<h1>Clientes</h1>} />
              <Route path="/admin/panel/comentary" element={<h1>Comentarios</h1>} />
              <Route path="/admin/panel/blogs" element={ <BlogAdminPage/> } />
            </Route>
          </Route>

        </Routes>
    );
};

export default Router

