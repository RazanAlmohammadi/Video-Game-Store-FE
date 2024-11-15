import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import notfound from "./Images/not_found.jpg";
import AboutPage from "./pages/AboutPage.js";
import ProductPage from "./pages/ProductPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./pages/ProductDetailPage.js";
import HomePage from "./pages/HomePage.js";
import WishListPage from "./pages/WishListPage.js";
import CartPage from "./pages/CartPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import ProductsPagination from "./components/products/ProductsPagination.js";
import Layout from "./Laytout/Layout.js";
import UserSignUpPage from "./pages/UserSignUpPage.js"
import UserLoginPage from "./pages/UserLoginPage.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import ProtectedRoute from "./components/user/ProtectedRoute.js"
import CategoryDetail from "./pages/CategoryDetailPage.js";
import DashBoard from "./components/dashBoard/DashBoard";
import SystemAdminProfile from "./components/user/SystemAdminProfile.js";
import ProductDashBoard from "./components/dashBoard/ProductDashBoard.js";
import UserManagementDashboard from "./components/dashBoard/UserManagementDashboard.js";
import UserOrderHistory from "./components/Order/UserOrderHistory.js";

function App() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [systemAdminData, setSystemAdminData] = useState(null);
  const [isSystemAdminDataLoading, setIsSystemAdminDataLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);


  const limit = 6;

  const getData = async (page) => {
    const offset = (page - 1) * limit;

    let videoGameInfoUrl = `https://video-game-store-fe.onrender.com/api/v1/VideoGamesInfo/Detailed?offset=${offset}&limit=${limit}&search=${userInput}`;

    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      return;
    }
    if (minPrice) videoGameInfoUrl += `&minPrice=${minPrice}`;
    if (maxPrice) videoGameInfoUrl += `&maxPrice=${maxPrice}`;

    try {
      const response = await axios.get(videoGameInfoUrl);
      setProductList(response.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page, userInput, minPrice, maxPrice]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://video-game-store-fe.onrender.com/api/v1/Customer/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });

  }



  function getSystemAdminData() {
    setIsSystemAdminDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://video-game-store-fe.onrender.com/api/v1/SystemAdmin/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSystemAdminData(res.data);
        setIsAdminAuthenticated(true);
        setIsSystemAdminDataLoading(false);
      })
      .catch((err) => {
        setIsAdminAuthenticated(false);
        setIsSystemAdminDataLoading(false);
        console.log(err);
      });
  }


  useEffect(() => {
    getUserData();
    getSystemAdminData();
  }, []);
  console.log(systemAdminData);
  let isAuthenticated = userData ? true : false;

  if (loading) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <img className="error" src={notfound} alt="404" />
        <p>{error.message}</p>
      </div>
    );
  }

  /*  function parseJwt(token) {
     const base64Url = token.split('.')[1];
     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     const jsonPayload = decodeURIComponent(
       atob(base64)
         .split('')
         .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
         .join('')
     );
     return JSON.parse(jsonPayload);
   }
   const token = localStorage.getItem("token");
   const decodedToken = token ? parseJwt(token) : null;
 
   if (decodedToken) {
     console.log(decodedToken.role);
     console.log(decodedToken.email);
   } */

  const totalPages = Math.ceil(totalCount / limit);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout wishList={wishList}
        isAuthenticated={isAuthenticated}
        isAdminAuthenticated={isAdminAuthenticated} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/Home", element: <HomePage /> },
        {
          path: "/Products",
          element: (
            <>
              <ProductPage products={productList}
                setUserInput={setUserInput}
                userInput={userInput}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                cartList={cartList}
                setCartList={setCartList}
                wishList={wishList}
                setWishList={setWishList} />
              <ProductsPagination page={page}
                handleChange={handleChange}
                count={totalPages}
              />
            </>
          ),
        },
        {
          path: "/Products/:productId", element: <ProductDetail
            products={productList}
            cartList={cartList}
            setCartList={setCartList} />
        },
        { path: "/categories/:categoryName", element: <CategoryDetail /> },
        { path: "/About", element: <AboutPage /> },
        { path: "/WishList", element: <WishListPage wishList={wishList} /> },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              isAuthenticated={isAuthenticated}
            />)
        },
        { path: "*", element: <NotFoundPage /> },
        { path: "/SignUp", element: <UserSignUpPage /> },
        {
          path: "/Login", element: <UserLoginPage
            getUserData={getUserData}
            getSystemAdminData={getSystemAdminData} />
        },
        {
          path: "/UserProfile", element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              isAdminAuthenticated={isAdminAuthenticated}
              element={
                <UserProfilePage userData={userData} setUserData={setUserData} />
              }
            />
          )

        },
        {
          path: "/SystemAdminProfile", element: < SystemAdminProfile
            systemAdminData={systemAdminData}
            isLoading={isSystemAdminDataLoading}
            setSystemAdminData={setSystemAdminData}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        },
        {
          path: "/dashBoard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              isAdminAuthenticated={isAdminAuthenticated}
              element={<DashBoard />}
            />
          ),
        },
        {
          path: "/product-dashboard",
          element: (
            <ProtectedRoute
              isAdminAuthenticated={isAdminAuthenticated}
              shouldCheckAdmin={true}
              element={
                <ProductDashBoard

                />
              }
            />
          ),
        },
        {
          path: "/userManagement-Dashboard",
          element: (
            <ProtectedRoute
              isAdminAuthenticated={isAdminAuthenticated}
              shouldCheckAdmin={true}
              element={
                <UserManagementDashboard

                />
              }
            />
          ),
        },
        {
          path: "/order-history",
          element: <UserOrderHistory />
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
