import { Routes, Route } from 'react-router-dom';

import NonAuthRoute from './NonAuthRoute';
import AuthRoute from './AuthRoute';
import Login from 'views/Login/Login';
import Register from 'views/Register/Register';
import Home from 'views/Home/Home';
import ResetPassword from 'views/ResetPassword/ResetPassword';
import ChangePassword from 'views/ChangePassword/ChangePassword';
import Product from 'views/Product/Product';
import MyProducts from 'views/MyProducts/MyProducts';

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="auth" element={<NonAuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
      <Route path="/" element={<AuthRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="my-products" element={<MyProducts />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
