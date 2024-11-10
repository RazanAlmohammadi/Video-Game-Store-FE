import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import notfound from "./Images/not_found.jpg";
import AboutPage from "./Pages/AboutPage.js";
import ProductPage from "./Pages/ProductPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetailPage.js";
import HomePage from "./Pages/HomePage.js";
import WishListPage from "./Pages/WishListPage.js";
import CartPage from "./Pages/CartPage.js";
import NotFoundPage from "./Pages/NotFoundPage.js";
import ProductsPagination from "./components/Products/ProductsPagination.js";
import Layout from "./Laytout/Layout.js";
import UserSignUpPage from "./Pages/UserSignUpPage.js"
import UserLoginPage from "./Pages/UserLoginPage.js";
import UserProfilePage from "./Pages/UserProfilePage.js";
import ProtectedRoute from "./components/user/ProtectedRoute.js"
import CategoryDetail from "./Pages/CategoryDetailPage.js";
import DashBoard from "./components/dashBoard/DashBoard";
import SystemAdminProfile from "./components/user/SystemAdminProfile.js";

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


  const limit = 6;

  const getData = async (page) => {
    const offset = (page - 1) * limit;

    let videoGameInfoUrl = `http://localhost:5125/api/v1/VideoGamesInfo/Detailed?offset=${offset}&limit=${limit}&search=${userInput}`;

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
  }, [page, userInput, , minPrice, maxPrice]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/Customer/Profile", {
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
    console.log(token, "from app");
  }

  console.log(userData, "from app");

  function getSystemAdminData() {
    setIsSystemAdminDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/SystemAdmin/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSystemAdminData(res.data);
        setIsSystemAdminDataLoading(false);
        setIsAdminAuthenticated(true);
      })
      .catch((err) => {
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
      element: <Layout />,
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
                setMaxPrice={setMaxPrice} />
              <ProductsPagination page={page}
                handleChange={handleChange}
                count={totalPages}
              />
            </>
          ),
        },
        { path: "/Products/:productId", element: <ProductDetail /> },
        { path: "/categories/:categoryName", element: <CategoryDetail /> },
        { path: "/About", element: <AboutPage /> },
        { path: "/WishList", element: <WishListPage /> },
        { path: "/cart", element: <CartPage /> },
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
          />
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              //decodedToken={decodedToken}
              element={<DashBoard />}
            />
          ),
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
