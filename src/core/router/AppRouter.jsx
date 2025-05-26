import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../context/authProvider';
import { getCategories } from '../../features/admin-categories/services/adminCategoriesApi.js';

// Layouts
import MainLayout from '../../shared/layouts/MainLayout';
import AdminLayout from '../../shared/layouts/AdminLayout';
import RequireAuth from './RequireAuth';

// Feature pages
import HomePage from '../../features/homepage/pages/HomePage.jsx';
import ProductsPage from '../../features/products/pages/ProductsPage.jsx';
import ContentProducts from '../../features/products/components/ContentProducts.jsx';
import PageCategorie from '../../features/categories/pages/PageCategorie.jsx';
import PolicyPage from '../../features/policy/pages/PolicyPage.jsx';
import BlogPage from '../../features/blogs/pages/BlogPage.jsx';
import BlogDetailsPage from '../../features/blogs/pages/BlogDetailsPage.jsx';
import PageQuestionsAndAnswers from '../../features/frequently-asked-questions/page/PageQuestionsAndAnswers.jsx';

import LoginPage from '../../features/login/Pages/LoginPage.jsx';
import AboutPage from '../../features/about/pages/about.jsx';

// Admin pages
import AdminDashboardPage from '../../features/admin-dashboard/pages/AdminDashboardPage';
import ProductAdminPage from '../../features/admin-products/pages/ProductAdminPage';
import CategoryAdminPage from '../../features/admin-categories/pages/CategoryAdminPage';
import BlogAdminPage from '../../features/admin-blog/pages/BlogAdminPage.jsx';
import ComentAdminPage from '../../features/admin-coments/pages/ComentAdminPage.jsx';
import PolicyAdminPage from '../../features/admin-policy/pages/PolicyAdminPage.jsx';
import ServiceAdminPage from '../../features/admin-services/page/ServiceAdminPage.jsx';
import InfoEmails from '../../features/admin-email/pages/InfoEmails.jsx';
import ContactAdminPage from '../../features/admin-contacts/pages/ContactAdminPage.jsx';
import PromotionAdminPage from '../../features/admin-promotion/pages/PromotionAdminPage';
import Questions from '../../features/admin-questions/page/Questions.jsx';
import NewProductsPage from '../../features/admin-new-products/pages/NewProductsPage.jsx';
import NewProductsPageAdmin from '../../features/new-products/pages/NewProductsPage.jsx';
import AboutAdminPage from '../../features/admin-about/pages/AboutAdmin.jsx'

import PromocionesProductos from '../../features/Promotion/pages/PromotionPage.jsx'
import PromotionDetailPage from '../../features/Promotion/components/PromotionDetails/PromotionDetailPage.jsx';
// scroll to top page
import ScrollToTop from '../../shared/components/ScrollPage/ScrollToPage.js'

import ContactPage from '../../features/contacts/pages/ContactPage.jsx';

import ProductDetails from '../../features/products/components/ProductDetails.jsx/ProductDetails.jsx';

import ShipmentPage from '../../features/shipment/Pages/ShipmentPage.jsx';

import ServiceDetailPage from '../../features/services-page/pages/ServiceDetailPage.jsx';




const Router = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories for routes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<ProductsPage />}>
            <Route path='/products/:name' element={<ProductDetails />} />
          </Route>

          <Route path="/new-products" element={<NewProductsPageAdmin />} />

          <Route path='/categories' element={<PageCategorie/>}>
            {/* Default index route */}
            <Route index element={<ContentProducts categorie="aceites"/>}/>
            {categories.map(category => (
              <Route 
                key={category.id || category._id}
                path={category.name.toLowerCase()} 
                element={<ContentProducts categorie={category.name}/>}
              />
            ))}
          </Route>

          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
          <Route path="/PreguntasFrecuentes" element={<PageQuestionsAndAnswers />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/promotions" element={<PromocionesProductos />} />
          <Route path="/products/:name" element={<PromotionDetailPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

          <Route path="/envios" element={<ShipmentPage />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/panel/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/panel/products" element={<ProductAdminPage />} />
            <Route path="/admin/panel/categories" element={<CategoryAdminPage />} />
            <Route path="/admin/panel/customers" element={<ContactAdminPage />} />
            <Route path="/admin/panel/blogs" element={<BlogAdminPage />} />
            <Route path="/admin/panel/coments" element={<ComentAdminPage />} />
            <Route path="/admin/panel/page/policy" element={<PolicyAdminPage />} />
            <Route path="/admin/panel/page/service" element={<ServiceAdminPage />} />
            <Route path="/admin/panel/mail" element={<InfoEmails />} />
            <Route path="/admin/panel/promotions" element={<PromotionAdminPage />} />
            <Route path="/admin/panel/page/about" element={<AboutAdminPage />} />
            <Route path="/admin/panel/questions" element={<Questions />} />
            <Route path="/admin/panel/productos%nuevos" element={<NewProductsPage />} />
            <Route path="/admin/panel/questions" element={<Questions />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;