/* eslint-disable react-hooks/set-state-in-effect */
import Layout from "../components/Layout";
import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History(){

const [transactions,setTransactions] = useState([]);
const [filter,setFilter] = useState("all");
const [search,setSearch] = useState("");

const navigate = useNavigate();

const fetchTransactions = async () => {

  try{

    const res = await API.get("/transactions");

    setTransactions(res.data);

  }catch(err){

    console.log(err);

  }

};

useEffect(()=>{

fetchTransactions();

},[]);


/* FILTER + SEARCH LOGIC */

const filteredTransactions = transactions.filter((t)=>{

const matchesFilter =
filter === "all" || t.type === filter;

const matchesSearch =
t.category?.toLowerCase().includes(search.toLowerCase()) ||
t.description?.toLowerCase().includes(search.toLowerCase());

return matchesFilter && matchesSearch;

});


return(

<Layout>

<div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
Transaction History
</h1>


{/* SEARCH */}

<div className="mb-6">

<input
type="text"
placeholder="Search transactions..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
/>

</div>


{/* FILTER TABS */}

<div className="flex gap-2 mb-6">

<button
onClick={()=>setFilter("all")}
className={
filter==="all"
? "px-4 py-2 bg-green-500 text-white rounded-full text-sm"
: "px-4 py-2 bg-gray-200 rounded-full text-sm"
}
>
All
</button>

<button
onClick={()=>setFilter("income")}
className={
filter==="income"
? "px-4 py-2 bg-green-500 text-white rounded-full text-sm"
: "px-4 py-2 bg-gray-200 rounded-full text-sm"
}
>
Income
</button>

<button
onClick={()=>setFilter("expense")}
className={
filter==="expense"
? "px-4 py-2 bg-green-500 text-white rounded-full text-sm"
: "px-4 py-2 bg-gray-200 rounded-full text-sm"
}
>
Expense
</button>

</div>


{/* TRANSACTIONS */}

<div className="space-y-4">

{filteredTransactions.length === 0 ? (

<p className="text-gray-500">
No transactions found
</p>

) : (

filteredTransactions.map((t)=>{

return(

<div
key={t._id}
className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
>

<div>

<p className="font-semibold">
{t.category}
</p>

<p className="text-sm text-gray-500">
{t.description}
</p>

<p className="text-xs text-gray-400">
{new Date(t.date).toLocaleDateString()}
</p>

</div>

<div
className={
t.type === "income"
? "text-green-600 font-semibold"
: "text-red-500 font-semibold"
}
>

₹ {t.amount}

</div>

</div>

)

})

)}

</div>


{/* FLOATING BUTTON */}

<button
onClick={()=>navigate("/add-transaction")}
className="fixed bottom-20 right-6 bg-green-500 text-white w-14 h-14 rounded-full text-xl shadow-lg"
>

+

</button>


</div>

</Layout>

)

}

export default History;