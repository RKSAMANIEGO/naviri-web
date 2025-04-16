import { Navigate, Route, Routes } from 'react-router-dom';
import {
  PolicyPage,
  HomePage,
  // BlogPage, // Moved to features
  // BlogDetailsPage, // Moved to features
  BlogAdminPage,
  PolicyAdminPage,
  ServiceAdminPage,
  LoginPage,
  // Products, // Removed, moved to features
  ProductAdmin,
  CategoriaPage,
  ComentAdminPage,
  PromotionAdminPage
}  from '../../pages/index';
import BlogPage from '../../features/blogs/pages/BlogPage.jsx'; // Added new import
import BlogDetailsPage from '../../features/blogs/pages/BlogDetailsPage.jsx'; // Added new import
import MainLayout from '../../shared/layouts/MainLayout';
import AdminLayout from '../../shared/layouts/AdminLayout';
import PageCategorie from '../../pages/PageCategoriaLanding/PageCategorie';

import RequireAuth from './RequireAuth';
import { useAuthStore } from '../context/authProvider';
import { useEffect } from 'react';

import InfoEmails from '../../pages/formClient/InfoEmails';
// import ContentProducts from '../../components/Products/ContentProducts'; // Removed, moved to features
import InfoContact from '../../pages/contactoadmin/InfoContact';
import ProductsPage from '../../features/products/pages/ProductsPage.jsx'; // Added new import
import ContentProducts from '../../features/products/components/ContentProducts.jsx'; // Added new import

const Router = () => {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  
    return (
      <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} /> {/* Updated route element */}
            <Route path='/categories' element={<PageCategorie/>}>

              <Route path="accesorios" element={ <ContentProducts categorie="accesorios"/>}/> {/* Uses new import */}
              <Route path="aceites" element={ <ContentProducts categorie="aceites"/>}/> {/* Uses new import */}
              <Route path="cosmeticos" element={ <ContentProducts categorie="Cosméticos"/>}/> {/* Uses new import */}
              <Route path="cuidado capilar" element={ <ContentProducts categorie="cuidado capilar"/>}/> {/* Uses new import */}
              <Route path="Exfoliante Corporal" element={ <ContentProducts categorie="Exfoliante Corporal"/>}/> {/* Uses new import */}
              <Route path="sales minerales" element={ <ContentProducts categorie="sales minerales"/>}/> {/* Uses new import */}

            </Route>
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
              <Route path="/admin/panel/customers" element={<InfoContact/>} />
              <Route path="/admin/panel/comentary" element={<h1>Comentarios</h1>} />
              <Route path="/admin/panel/blogs" element={ <BlogAdminPage/> } />
              <Route path="/admin/panel/coments" element={ <ComentAdminPage/> } />
              <Route path="/admin/panel/page/policy" element={ <PolicyAdminPage/> } />
              <Route path="/admin/panel/page/service" element={ <ServiceAdminPage/>} />
              <Route path="/admin/panel/mail" element={ <InfoEmails/>} />
              <Route path="/admin/panel/promotions" element={ <PromotionAdminPage/>} />
            </Route>
          </Route>

        </Routes>
    );
};

export default Router;