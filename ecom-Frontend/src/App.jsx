import './App.css'
import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Admin from './pages/Admin'
import AllUser from './components/AllUser'
import AddCategory from './components/AddCategory'
import AllOrdersByAdmin from './components/AllOrdersByAdmin'
import ProductsDetails from './components/UiSingleProducts'
import AllProduct from './components/AllProduct'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/updateProduct'
import AddCart from './components/UiAddCart'
import ProductList from './components/UiProductList'
import PlaceOrder from './components/UiOrder'
import MyOrders from './components/UiMyOrders'



function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/login' element={<Auth insideRegister={false} />} />
        <Route path='/' element={<Home />} />
        <Route path='/adminDashboard' element={<Admin />}>
       
          <Route path='users' element={<AllUser />} />
          <Route path='categories' element={<AddCategory />} />
          <Route path='categories' element={<AddCategory />} />
          <Route path='products' element={<AllProduct />} />
          <Route path='products/add' element={<AddProduct />} />
          <Route path='product/update/:id' element={<UpdateProduct />} />
          <Route path='orders' element={<AllOrdersByAdmin />} />

        </Route>
        <Route path='cart' element={<AddCart />} />
        <Route path='/getSingleProduct/:id' element={<ProductsDetails />} />
        <Route path='/products/' element={<ProductList />} />
        <Route path='/order/' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<PlaceOrder />} />
        <Route path='/order/myOrder' element={<MyOrders />} />
        <Route path='/order/cancelOrder' element={<MyOrders />} />
      </Routes>

    </>
  )
}
export default App


