import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import CriteriaPage from './pages/Criteria';
import Dashboard from './pages/Dashboard';
import MetricsView from './pages/MetricsView';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyIdentifier from './pages/KeyIdentifier';


function PrivateOutlet() {
  var auth = (localStorage.getItem('naac_dbcy_user') && JSON.parse(atob(localStorage.getItem('naac_dbcy_user')))?.access) || false;
  return auth ? <DashboardLayout><Outlet /></DashboardLayout> : <Navigate to="/login" />;
}

export default function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
      navigate('/login');
    });
    return () => window.removeEventListener("beforeunload", () => { });
  });
  return (
    <Routes>
      <Route path='*' element={<Page404 />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path="/" element={<PrivateOutlet />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/key-identifier" element={<KeyIdentifier />} />
        <Route path='/metrics/:id' element={<MetricsView />} />
        <Route path='/criteria' element={<CriteriaPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/blog' element={<BlogPage />} />
      </Route>
    </Routes>
  )

}
