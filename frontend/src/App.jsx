import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Budgets from "./pages/Budgets";
import History from "./pages/History";
import Insights from "./pages/Insights";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route path="/budgets" element={<Budgets />} />

        <Route path="/history" element={<History />} />

        <Route path="/insights" element={<Insights />} />

        <Route path="/ai-chat" element={<AIChat />} />

        <Route path="/profile" element={<Profile />} />



        
      </Routes>

    </BrowserRouter>

  );
}

export default App;