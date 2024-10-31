
import { useState, useEffect} from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import notfound from "./Images/not_found.jpg";
import AboutPage from "./Pages/AboutPage.js";

import ProductPage from "./Pages/ProductPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetailPage.js";
import HomePage from "./Pages/HomePage.js"
import WishListPage from "./Pages/WishListPage.js";
import CartPage from "./Pages/CartPage.js";
import Layout from "./Laytout/Layout.js";
import NotFoundPage from "./Pages/NotFoundPage.js";


function App() {
  const [wishList, setWishList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
/* 
  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  }); */
  const videoGameInfoUrl = "http://localhost:5125/api/v1/VideoGamesInfo?Limit=20"

  function getData() {
    axios
      .get(videoGameInfoUrl)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout wishList={wishList} />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/Home",
          element: <HomePage />,
        },
        {
          path: "/Products",
          element: <ProductPage products={productList}  />,
        },
        {
          path: "/Products/:productId",
          element: <ProductDetail />,
        },

        {
          path: "/About",
          element: <AboutPage />,
        },

        {
          path: "/WishList",
          element: <WishListPage wishList={wishList} />
        },
        {
          path: "/cart",
          element: <CartPage />
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },

      ]
    }]);




  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
