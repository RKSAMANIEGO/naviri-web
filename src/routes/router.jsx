import { Navigate, Route, Routes } from 'react-router-dom';
import {PolicyPage, HomePage, MainLayout} from '../pages/index';


const Router = () => {

    return (
        <Routes>
          <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/policity" element={<PolicyPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
    );
};

export default Router

