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


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
      <Footer></Footer>
    </QueryClientProvider>
  );
}

export default App;
