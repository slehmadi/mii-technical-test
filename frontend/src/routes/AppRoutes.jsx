import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import StorePage from "../pages/StorePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/products/:id' element={<ProductPage />} />
                    <Route path='/store/:id' element={<StorePage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/checkout' element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;