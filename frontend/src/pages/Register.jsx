/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/logo.png";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();
    if(password !== confirmPassword){
      alert("password do not match");
      return;
    }

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");

      navigate("/");

    } catch (error) {

      alert("Registration failed");

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
        Create Account
      </h1>

      <p className="text-gray-500 mt-2">
        Join FinSight AI to master your finances with intelligence.
      </p>

    </div>


    <form onSubmit={handleRegister} className="space-y-4">

      <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
      />

      <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
      />

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
      />

      <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
      />

      <button
      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
      >

        Create Account →

      </button>

    </form>


    <p className="text-center text-sm mt-6">

      Already have an account?{" "}

      <span
      onClick={()=>navigate("/")}
      className="text-green-600 cursor-pointer"
      >

        Log In

      </span>

    </p>

  </div>

</div>

)
}

export default Register;