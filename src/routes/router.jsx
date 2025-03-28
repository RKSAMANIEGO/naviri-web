import { Navigate, Route, Routes } from 'react-router-dom';
import {PolicyPage, HomePage, MainLayout, BlogPage, BlogDetailsPage} from '../pages/index';


const Router = () => {

    return (
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/policity" element={<PolicyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogDetailsPage/>} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
    );
};

export default Router

