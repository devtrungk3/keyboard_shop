import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
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
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;