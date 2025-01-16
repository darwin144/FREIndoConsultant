import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element }) => {
    const accessToken = localStorage.getItem('access_token'); // Ambil token dari localStorage

    return accessToken ? element : <Navigate to="/login" />;
};
