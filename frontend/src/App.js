<<<<<<< HEAD
import React, {useState} from 'react';
import Login from './pages/Login';
import Layout from './pages/admin/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState('home');
    //
    // const handleLogin = () => {
    //     setIsLoggedIn(true);
    // };
    //
    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     setActivePage('home');
    // };
    //
    // return (
    //     <div>
    //         {isLoggedIn ? (
    //             <Layout activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout}/>
    //         ) : (
    //             <Login onLogin={handleLogin}/>
    //         )}
    //     </div>
    // );
    return (
        <Layout activePage={activePage} setActivePage={setActivePage}/>
    )

=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
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
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 095f912e7db7c3f4026ea0ea198797694e33cf97
}

export default App;