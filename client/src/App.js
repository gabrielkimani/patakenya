import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";
import Filter from "./components/Filter";
import PostAd from "./components/PostAd";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import SellerDashboard from "./components/SellerDashboard";
import Messaging from "./components/Messaging";
import Chats from "./components/seller/Chats";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route path="/listings" element={<Product />} />

          <Route path="/search/adName/:adName" exact element={<Filter />} />

          <Route path="/search/adName" element={<Filter />} exact></Route>
          <Route
            path="/search/category/:category"
            element={<Filter />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/adName/:adName"
            element={<Filter />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/adName/:adName/min/:min/max/:max/order/:order/location/:location/condition/:condition"
            element={<Filter />}
            exact
          ></Route>
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-dashboard/page/:page"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/chat/seller/:seller/ad/:ad"
            element={
              <PrivateRoute>
                <Messaging />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-messages"
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
          />

          <Route
            path="/post-ad-free"
            element={
              <PrivateRoute>
                <PostAd />
              </PrivateRoute>
            }
          />
          <Route path="/admin/dashboard/page/:page" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
