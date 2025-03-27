import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Layout from './pages/admin/Layout';
import Product from './pages/admin/product/Product';
import Brand from './pages/admin/brand/Brand';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute allowedRoles={['user', 'admin']}>
                            <Welcome/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Layout/>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/admin/product" replace/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="brand" element={<Brand/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/welcome" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;