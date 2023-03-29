import { createBrowserRouter, RouteObject } from "react-router-dom";
import BasicLayout from "../layouts/basic.layout";
import ProductList from "../pages/product/list";

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [{
      // it renders this element
      element: <ProductList />,

      // when the URL matches this segment
      path: '/products/',
    },]
  },

]);

export default router;
