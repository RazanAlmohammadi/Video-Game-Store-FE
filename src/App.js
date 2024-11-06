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

function App() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const limit = 6; 

  const getData = async (page) => {
    const offset = (page - 1) * limit;
    const videoGameInfoUrl = `http://localhost:5125/api/v1/VideoGamesInfo?offset=${offset}&limit=${limit}&search=${userInput}`;

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
  }, [page, userInput]); 

  const handleChange = (event, value) => {
    setPage(value);
  };

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
  const totalPages = Math.ceil(totalCount / limit);
  const router = createBrowserRouter([
    {
      path: "/",
     element: <Layout/>,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/Home", element: <HomePage /> },
        {
          path: "/Products",
          element: (
            <>
              <ProductPage products={productList}
                setUserInput={setUserInput}
                userInput={userInput} />
              <ProductsPagination page={page} 
              handleChange={handleChange} 
              count={totalPages}
                />
            </>
          ),
        },
        { path: "/Products/:productId", element: <ProductDetail /> },
        { path: "/About", element: <AboutPage /> },
        { path: "/WishList", element: <WishListPage  /> },
        { path: "/cart", element: <CartPage /> },
        { path: "*", element: <NotFoundPage /> },
        {path: "/SignUp", element:<UserSignUpPage/>},
        {path:"/Login", element:<UserLoginPage/>},
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
