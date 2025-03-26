import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    const { exp, role } = jwtDecode(token);
    if (exp * 1000 - Date.now() <= 0) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect to a default page based on role if access is denied
      return <Navigate to={role === 'admin' ? '/admin/users' : '/welcome'} replace />;
    }
  }
  
  return children;
}

export default ProtectedRoute;