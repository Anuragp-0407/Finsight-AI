/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {Mail,Lock} from "lucide-react";
import logo from "../assets/logo.png";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid email or password");

    }
  };

  return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">

  <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow">

    <div className="text-center mb-8">

      <img
        src={logo}
        alt="FinSight AI"
        className="w-16 h-16 mx-auto mb-4"
      />

      <h2 className="text-green-600 font-semibold text-lg">
        FinSight AI
      </h2>

      <h1 className="text-3xl font-bold mt-4">
        Welcome Back
      </h1>

      <p className="text-gray-500 mt-2">
        Securely access your AI-driven financial insights
      </p>

    </div>


    <form onSubmit={handleLogin} className="space-y-4">

      <div>

        <label className="block text-sm mb-1">
          Email Address
        </label>

        <div className="flex items-center border rounded-1g p-3">
          <Mail size={18} className="text-gray-400 mr-2"/>
          <input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full outline-none"
          />

        </div>
      </div>

      <div>

        <label className="block text-sm mb-1">
          Password
        </label>
        <div className="flex items-center border rounded-lg p-3">
          <Lock size={18} clssName="text-grey-400 mr-2"/>
          <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full outline-none"
          />

        </div>
      </div>

      <button
      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
      >

        SIGN IN TO DASHBOARD

      </button>

    </form>


    <p className="text-center text-sm mt-6">

      Don't have an account?{" "}

      <span
      onClick={()=>navigate("/register")}
      className="text-green-600 cursor-pointer"
      >

        Sign up for free

      </span>

    </p>

  </div>

</div>

)
}

export default Login;