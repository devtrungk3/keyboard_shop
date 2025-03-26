import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function PublicRoute({children}) {
    const token = localStorage.getItem('accessToken');
    if (token) {
        const {exp} = jwtDecode(token);
        if (exp * 1000 - Date.now() > 0) {
            return <Navigate to="/welcome" replace/>;
        }
    }
    return children;
}

export default PublicRoute;