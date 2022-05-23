import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Footer from './Components/Shared/Footer';
import NavigationBar from './Components/Shared/NavigationBar';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import RequiredAuth from './Components/Auth/RequiredAuth';
import Purchase from './Pages/Purchase/Purchase';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/Outlet/MyProfile';
import AddReview from './Pages/Dashboard/Outlet/AddReview';
import MyOrders from './Pages/Dashboard/Outlet/MyOrders';
import RequiredAdmin from './Components/Auth/RequiredAdmin';
import ManageOrders from './Pages/Dashboard/Outlet/ManageOrders';
import AddProduct from './Pages/Dashboard/Outlet/AddProduct';
import ManageProduct from './Pages/Dashboard/Outlet/ManageProduct';
import ManageUsers from './Pages/Dashboard/Outlet/ManageUsers';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/purchase/:productId' element={<RequiredAuth><Purchase></Purchase></RequiredAuth>}></Route>

        <Route path='/dashboard'
          element={
            <RequiredAuth>
              <Dashboard></Dashboard>
            </RequiredAuth>}>

          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="review" element={<AddReview></AddReview>}></Route>
          <Route path="my-order" element={<MyOrders></MyOrders>}></Route>

          <Route path='manage-users' element={<RequiredAdmin><ManageUsers></ManageUsers></RequiredAdmin>}></Route>
          <Route path='manage-orders' element={<RequiredAdmin><ManageOrders></ManageOrders></RequiredAdmin>}></Route>
          <Route path='add-product' element={<RequiredAdmin><AddProduct></AddProduct></RequiredAdmin>}></Route>
          <Route path='manage-product' element={<RequiredAdmin><ManageProduct></ManageProduct></RequiredAdmin>}></Route>
        </Route>

      </Routes>
      <Footer></Footer>
    </QueryClientProvider>
  );
}

export default App;
