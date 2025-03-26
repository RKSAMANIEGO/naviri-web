import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import PolicyPage from '../pages/policity/PolicyPage';


const Prueba = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/policity" element={<PolicyPage/>} />
        </Routes>
    );
};

export default Prueba

