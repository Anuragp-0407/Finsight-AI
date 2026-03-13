import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Bot,
  Wallet,
  UserRound
} from "lucide-react";

function Sidebar({ isOpen, toggle }) {

  return (

    <>

      {/* MOBILE OVERLAY */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={toggle}
        ></div>
      )}

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-200 z-40`}
      >

        <div className="p-6 border-b">

          <h1 className="text-xl font-bold text-green-600">
            FinSight AI
          </h1>

        </div>


        <nav className="flex flex-col gap-2 p-4">

          <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <LayoutDashboard size={18}/>
            Dashboard
          </Link>

          <Link to="/add-transaction" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <PlusCircle size={18}/>
            Add Transaction
          </Link>

          <Link to="/history" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <History size={18}/>
            History
          </Link>

          <Link to="/insights" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <BarChart3 size={18}/>
            Insights
          </Link>

          <Link to="/ai-chat" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <Bot size={18}/>
            AI Assistant
          </Link>

          <Link to="/budgets" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <Wallet size={18}/>
            Budgets
          </Link>
          
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <UserRound size={18}/>
            Profile
          </Link>

        </nav>

      </div>

    </>

  );

}

export default Sidebar;