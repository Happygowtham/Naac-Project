import { Navigate, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import CriteriaPage from './pages/Criteria';
import Dashboard from './pages/Dashboard';
import Metrics from './pages/Metrics';

// ----------------------------------------------------------------------
const PrivateRoute = ({ component: Component, ...rest }) => {

  var isAuthenticated = JSON.parse(atob(localStorage.getItem('user')))?.access

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <DashboardLayout>
            <Component {...props} />
          </DashboardLayout>
        ) : (
          <Navigate to='/' />
        )
      }
    />
  );
};


export default function Router() {
  return (
    <Routes>
      <Route path='*' element={<Page404 />} />
      <Route path='/' element={<LoginPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/metrics/:id' element={<Metrics />} />
      {/*<PrivateRoute path='/criteria' element={<CriteriaPage />} />
      <PrivateRoute path='/products' element={<ProductsPage />} />
      <PrivateRoute path='/blog' element={<BlogPage />} /> */}
    </Routes>

  )

}
