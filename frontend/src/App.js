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

}

export default App;