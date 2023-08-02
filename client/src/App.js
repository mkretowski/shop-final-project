import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productsReducer';
import { getUserRequest } from './redux/userReducer';
import { toggleViewportmode } from './redux/viewportModeReducer';
import { fetchOrdersByUser } from './redux/ordersReducer';
import { getUserId } from './redux/userReducer';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import './styles/bootstrap.scss';
import './styles/global.scss';
import Products from './components/pages/Products/Products';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import ToastProvider from './contexts/ToastContext';
import Cart from './components/pages/Cart/Cart';
import MyOrders from './components/pages/MyOrders/MyOrders';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getUserRequest());
    dispatch(fetchOrdersByUser(userId));
    const setViewportMode = () => {
      const { innerWidth: width } = window;
      return dispatch(toggleViewportmode(width));
    };
    setViewportMode();
    window.addEventListener('resize', setViewportMode);

    return () => window.removeEventListener('resize', setViewportMode);
  }, [dispatch, userId]);

  return (
    <ToastProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ToastProvider>
  );
};

export default App;
