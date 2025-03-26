import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function ProtectedRoute({children}) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        localStorage.removeItem("accessToken");
        return <Navigate to="/login" replace/>;
    } else {
        const {exp} = jwtDecode(token);
        if (exp * 1000 - Date.now() <= 0) {
            return <Navigate to="/login" replace/>;
        }
    }
    return children;
}

export default ProtectedRoute;