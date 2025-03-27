import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';


const Prueba = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Prueba

