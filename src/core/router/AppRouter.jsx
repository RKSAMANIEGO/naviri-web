import { Navigate, Route, Routes } from 'react-router-dom';

/*FALTAN REESTRUCTURAR */
import {
  PolicyPage,
  BlogAdminPage,
  LoginPage,
  //ProductAdmin, // Moved to features
  CategoriaPage,
  ComentAdminPage,
  PromotionAdminPage
}  from '../../pages/index';

import ServiceAdminPage from '../../features/admin-services/page/ServiceAdminPage.jsx'; // Import the new service admin page
import PolicyAdminPage from '../../features/admin-policy/pages/PolicyAdminPage.jsx'; // Import the new policy admin page
import HomePage from '../../features/homepage/pages/HomePage.jsx';
import BlogPage from '../../features/blogs/pages/BlogPage.jsx'; 
import BlogDetailsPage from '../../features/blogs/pages/BlogDetailsPage.jsx'; 
import MainLayout from '../../shared/layouts/MainLayout';
import AdminLayout from '../../shared/layouts/AdminLayout';
import PageCategorie from '../../pages/PageCategoriaLanding/PageCategorie';

import RequireAuth from './RequireAuth';
import { useAuthStore } from '../context/authProvider';
import { useEffect } from 'react';
import AdminDashboardPage from '../../features/admin-dashboard/pages/AdminDashboardPage'; // Import the new dashboard page
import ProductAdminPage from '../../features/admin-products/pages/ProductAdminPage'; // Import the new product admin page
import CategoryAdminPage from '../../features/admin-categories/pages/CategoryAdminPage'; // Import the new category admin page

import InfoEmails from '../../pages/formClient/InfoEmails';
import InfoContact from '../../pages/contactoadmin/InfoContact';

import ProductsPage from '../../features/products/pages/ProductsPage.jsx'; // Added new import
import ContentProducts from '../../features/products/components/ContentProducts.jsx'; // Added new import
import PageQuestionsAndAnswers from '../../pages/PageQuestionAndAnswers/PageQuestionsAndAnswers.jsx';


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
            <Route path="/PreguntasFrecuentes" element={<PageQuestionsAndAnswers/>} /> {/* Added new route frequently asked questions */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />  
          <Route element={ <RequireAuth/> }>
            <Route element={<AdminLayout />}>
              <Route path="/admin/panel/dashboard" element={<AdminDashboardPage />} /> {/* Add dashboard route */}
              <Route path="/admin/panel/products" element={<ProductAdminPage/>} /> {/* Updated route element */}
              <Route path="/admin/panel/categories" element={<CategoryAdminPage/>} /> {/* Updated route element */}
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