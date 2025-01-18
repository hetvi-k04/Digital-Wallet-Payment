// import { Button } from "antd";
import "./stylesheets/textelements.css"
import "./stylesheets/formelements.css"
import "./stylesheets/custom components.css"
import "./stylesheets/alignments.css"
import "./stylesheets/theme.css"
import "./stylesheets/layout.css"
import { BrowserRouter ,Routes,Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from"./pages/Home";
import Transactions from"./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
      <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        {/* <Route path ="/register" element={<Register/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/" element={<Home/>}/> */}
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
