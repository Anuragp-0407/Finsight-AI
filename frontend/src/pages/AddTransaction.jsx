import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout"

function AddTransaction() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/transactions", form);

      alert("Transaction added successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);
      alert("Failed to add transaction");

    }

  };

  return (

<Layout>

<div className="max-w-lg mx-auto">

<h1 className="text-2xl font-bold mb-6">
Add Transaction
</h1>

<form
onSubmit={handleSubmit}
className="bg-white p-6 rounded-xl shadow space-y-4"
>

{/* TYPE */}

<div>

<label className="block text-sm mb-1">
Type
</label>

<select
name="type"
value={form.type}
onChange={handleChange}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
>

<option value="income">
Income
</option>

<option value="expense">
Expense
</option>

</select>

</div>


{/* AMOUNT */}

<div>

<label className="block text-sm mb-1">
Amount
</label>

<input
type="number"
name="amount"
placeholder="Enter amount"
value={form.amount}
onChange={handleChange}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>


{/* CATEGORY */}

<div>

<label className="block text-sm mb-1">
Category
</label>

<input
type="text"
name="category"
placeholder="Food, Travel, Salary..."
value={form.category}
onChange={handleChange}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>


{/* DESCRIPTION */}

<div>

<label className="block text-sm mb-1">
Description
</label>

<input
type="text"
name="description"
placeholder="Optional note"
value={form.description}
onChange={handleChange}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>


{/* DATE */}

<div>

<label className="block text-sm mb-1">
Date
</label>

<input
type="date"
name="date"
value={form.date}
onChange={handleChange}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>


<button
className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
>

Save Transaction

</button>

</form>

</div>

</Layout>

)

}

export default AddTransaction;