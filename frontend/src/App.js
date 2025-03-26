import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Layout from './pages/admin/Layout';
import Product from './pages/admin/product/Product';
import Brand from './pages/admin/brand/Brand';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

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
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <Welcome/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
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

