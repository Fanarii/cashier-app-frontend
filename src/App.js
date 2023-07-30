import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './peges/Home.jsx'
import Message from "./peges/Message.jsx";
import Dashboard from "./peges/Dashboard.jsx";
import Setting from "./peges/Setting.jsx";
import StaffDashboard from './peges/StaffDashboard.jsx';
import MenuManagement from "./peges/MenuManagement.jsx";
import OrderList from "./peges/OrderList.jsx";
import UserManagement from "./peges/UserManagement.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/messages" element={<Message/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/settings" element={<Setting/>}/>
        <Route path="/staff" element={<StaffDashboard/>}/>
        <Route path="/menu" element={<MenuManagement/>}/>
        <Route path="/order" element={<OrderList/>}/>
        <Route path="/user" element={<UserManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
