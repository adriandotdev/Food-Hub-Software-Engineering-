import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";

// components
import Navbar from './components/Navbar'
import AdminNavbar from './components (admin)/AdminNavbar'

// pages
import UserLoginPage from './Pages/UserLoginPage'
import UserSignupPage from './Pages/UserSignupPage'
import AdminPage from './Pages/AdminPage'
import MenuPage from './Pages/MenuPage'
import CustomersPage from './Pages/CustomersPage'
import AdminLogin from './Pages/AdminLogin'
import Homepage from './Pages/Homepage'
import MenuInfoPage from './Pages/MenuInfoPage'
import ProfilePage from './Pages/ProfilePage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import YourOrders from './Pages/YourOrders'
import AdminOrders from './Pages/AdminOrders'
import AboutPage from './Pages/AboutPage'
import Summary from './Pages/Summary'
// Contexts
import { AdminMenuProvider } from './contexts/AdminMenuContext'
import { AdminOrderProvider } from './contexts/AdminOrderContext'

function App() {

  const [isAdmin, setAdmin] = useState(false);

  // If the admin account hasn't logged out yet, we still use the sessionStorage for previous activity.
  useEffect(() => {

    if (window.sessionStorage.getItem('isAdmin') === 'true')
      setAdmin(true)
  }, [])

  return (

    <Router>

      <Routes>
        {/* Routes for user */}
        <Route path="/" element={<Navbar navClass="grid grid-rows-2 min-h-screen" />} >
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/menu/:id" element={<MenuInfoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/your-orders" element={<YourOrders />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Routes for admin */}
        <Route path="/admin" element={<AdminNavbar isAdmin={isAdmin} setAdmin={setAdmin} navClass="admin-layout" />}>

          {!isAdmin && <Route path="/admin" element={<AdminLogin setAdmin={setAdmin} />} />}

          {
            isAdmin && <Route path="/admin" element={<AdminPage />}>
              <Route path="/admin/users" element={<CustomersPage />} />
              <Route path="/admin/menu" element={<AdminMenuProvider><MenuPage /></AdminMenuProvider>} />
              <Route path="/admin/orders" element={<AdminMenuProvider><AdminOrderProvider><AdminOrders /></AdminOrderProvider></AdminMenuProvider>} />
              <Route path="/admin/summary" element={<Summary />} />
            </Route>
          }
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
