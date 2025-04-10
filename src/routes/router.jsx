import { Navigate, Route, Routes } from 'react-router-dom';
import {
  PolicyPage, 
  HomePage, 
  AdminLayout, 
  MainLayout, 
  BlogPage, 
  BlogDetailsPage, 
  BlogAdminPage,
  PolicyAdminPage,
  ServiceAdminPage,
  LoginPage,
  Products,
  ProductAdmin,
  CategoriaPage,
  ComentAdminPage
}  from '../pages/index';

import RequireAuth from './RequireAuth';
import { useAuthStore } from '../context/authProvider';
import { useEffect } from 'react';
import PageCategorie from '../pages/PageCategoriaLanding/PageCategorie';



const Router = () => {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  
    return (
      <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path='/categories' element={<PageCategorie/>}/> 
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogDetailsPage/>} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />  
          <Route element={ <RequireAuth/> }>
            <Route element={<AdminLayout />}>
              <Route path="/admin/panel/products" element={<ProductAdmin/>} />
              <Route path="/admin/panel/categories" element={<CategoriaPage/>} />
              <Route path="/admin/panel/customers" element={<h1>Clientes</h1>} />
              <Route path="/admin/panel/comentary" element={<h1>Comentarios</h1>} />
              <Route path="/admin/panel/blogs" element={ <BlogAdminPage/> } />
              <Route path="/admin/panel/coments" element={ <ComentAdminPage/> } />
              <Route path="/admin/panel/page/policy" element={ <PolicyAdminPage/> } />
              <Route path="/admin/panel/page/service" element={ <ServiceAdminPage/>} />
            </Route>
          </Route>

        </Routes>
    );
};

export default Router

