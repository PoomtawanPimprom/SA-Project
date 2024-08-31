import ReactDOM from "react-dom/client";
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
//page
import Login  from './pages/login/login';
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Payment from './pages/payment_coin/payment_coin'
import Publish from "./pages/publish/publish";
import Bookshelf_followed from "./pages/bookshelf/bookshelf_followed";
import Bookshelf_bought from "./pages/bookshelf/bookshelf_bought";
import Bookshelf_history from "./pages/bookshelf/bookshelf_history";
import Cartoon from "./pages/cartoon/cartoon";
import Episodes from "./pages/episodes/episodes";
import Publish_Series from "./pages/publish_episodes/publish_series";
import Publish_Episodes from "./pages/publish_series/publish_episodes";
import CommentPage from "./pages/comment/mainpage/comment";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Buycoin' element={<Payment />}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Home' element={<Dashboard/>}/>
        {/* <Route path='/Bookshelf' element={<Bookshelf/>}/> */}
        <Route path='/Publish' element={<Publish/>}/>
        <Route path='/Publish_Series' element={<Publish_Series/>}/> 
        <Route path='/Publish_Episodes' element={<Publish_Episodes/>}/>            
        <Route path='/Bookshelf' element={<Bookshelf_followed/>}/>            
        <Route path='/Bookshelf/Followed' element={<Bookshelf_followed/>}/>            
        <Route path='/Bookshelf/History' element={<Bookshelf_history/>}/>            
        <Route path='/Bookshelf/Bought' element={<Bookshelf_bought/>}/>    
        <Route path='/Home/cartoon' element={<Cartoon/>}/>        
        <Route path='/Home/cartoon/episodes' element={<Episodes/>}/>    
        <Route path='/Home/cartoon/episodes/comment' element={<CommentPage/>}/>    
      </Routes >
    </BrowserRouter>
  );
}
export default App;
