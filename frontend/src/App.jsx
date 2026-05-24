import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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

        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />

        <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />

        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

        <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />

        <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />



        
      </Routes>

    </BrowserRouter>

  );
}

export default App;