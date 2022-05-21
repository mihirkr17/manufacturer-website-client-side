import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
