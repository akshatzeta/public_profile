import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Page from "./component/Page"; 
import AdminDashboard from './component/AdminDashboard';
import Login from './component/Login';
import Signup from './component/Signup';
import PrivateRoute from './component/PrivateRoute'; // Import PrivateRoute
import SignupForm from './component/SignupForm';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarWithConditionalRendering />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form" element={<SignupForm />} />
          
          {/* Protect all other routes with PrivateRoute */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={<Page />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/pages" element={<PrivateRoute element={<Home />} />} />
          <Route path="/portfolio" element={<PrivateRoute element={<Home />} />} />
          <Route path="/blog" element={<PrivateRoute element={<Home />} />} />
          <Route path="/shop" element={<PrivateRoute element={<Home />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
        </Routes>
      </Router>
    </div>
  );
}

const NavbarWithConditionalRendering = () => {
  const location = useLocation();
  
  const hideNavbarRoutes = [
    '/login', 
    '/signup', 
    '/admin'
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
    </>
  );
};

export default App;
