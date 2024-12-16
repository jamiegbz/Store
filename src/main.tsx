//imports 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartList from './components/CartList.tsx'
import ProductList, { productListLoader } from './components/ProductList.tsx'
import Root from './Root.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import LegoDetails from './components/LegoDetails.tsx'


//downloaded router
//adding pages on main tsx
//added errorpage when error occurs
// pages are childern of root 
//adding product list page
//cart list page
//lego details page
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <ProductList/>,
        loader: productListLoader

      },
      {
        path: "/cart",
        element: <CartList/>
      },
      {
        path:"/Legos/:productId",
        element: <LegoDetails/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
