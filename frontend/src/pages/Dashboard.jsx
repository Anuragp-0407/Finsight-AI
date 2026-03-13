import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import TransactionItem from "../components/TransactionItem";

function Dashboard() {

  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState([]);

  const fetchTransactions = async () => {

    try {

      const res = await API.get("/transactions");

      const data = res.data;

      setTransactions(data);

      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((t) => {

        if (t.type === "income") {
          totalIncome += t.amount;
        } else {
          totalExpense += t.amount;
        }

      });

      setSummary({
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense
      });

    } catch (error) {

      console.log(error);

    }

  };

  const fetchCategorySummary = async () => {

    try {

      const res = await API.get("/transactions/category-summary");
      setCategoryData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchMonthlySummary = async () => {

    try {

      const res = await API.get("/transactions/monthly-summary");
      setMonthlyData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchAIInsights = async () => {

    try {

      const res = await API.get("/transactions/ai-insights");
      setInsights(res.data.insights || []);

    } catch (error) {

      console.log("AI Insights failed", error);

    }

  };

  useEffect(() => {

    const loadDashboard = async () => {

      await fetchTransactions();
      await fetchCategorySummary();
      await fetchMonthlySummary();
      await fetchAIInsights();

    };

    loadDashboard();

  }, []);
  

  return (

    <Layout>

      <div className="max-w-md md:max-w-2xl lg:max-w-6xl">

        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>


        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500 to-green-400 text-white shadow">

            <p className="text-sm opacity-80">
              Total Balance
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹ {summary.balance}
            </h2>

          </div>


          <div className="p-6 rounded-2xl bg-white shadow border">

            <p className="text-gray-500 text-sm">
              Income
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹ {summary.income}
            </h2>

          </div>


          <div className="p-6 rounded-2xl bg-white shadow border">

            <p className="text-gray-500 text-sm">
              Expenses
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              ₹ {summary.expense}
            </h2>

          </div>

        </div>


        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow-sm border">

            <h2 className="font-semibold mb-4">
              Monthly Spending
            </h2>

            <MonthlyChart data={monthlyData} />

          </div>


          <div className="bg-white p-6 rounded-2xl shadow-sm border">

            <h2 className="font-semibold mb-4">
              Category Spending
            </h2>

            <CategoryChart data={categoryData} />

          </div>

        </div>


        {/* TOP CATEGORIES */}

<div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">

<h2 className="font-semibold mb-5">
Top Categories
</h2>

{categoryData.length === 0 ? (

<p className="text-gray-400">
No category data
</p>

) : (

categoryData.map((c,index)=>{

const max = Math.max(...categoryData.map(i => i.total))
const percent = (c.total / max) * 100

const colors = [
"bg-green-500",
"bg-blue-500",
"bg-orange-500",
"bg-purple-500"
]

return(

<div key={index} className="mb-5">

<div className="flex justify-between text-sm mb-2">

<div className="flex items-center gap-2">

<div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>

<span className="capitalize font-medium">
{c.category}
</span>

</div>

<span className="text-gray-600">
₹ {c.total}
</span>

</div>

<div className="w-full bg-gray-200 h-2 rounded-full">

<div
className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-700 ease-in-out`}
style={{width:`${percent}%`}}
></div>

</div>

</div>

)

})

)}

</div>

        {/* RECENT TRANSACTIONS */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">

          <h2 className="font-semibold mb-5">
            Recent Transactions
          </h2>

          <div className="space-y-4">

            {transactions.slice(0,5).map((t)=>(

              <TransactionItem
                key={t._id}
                transaction={t}
              />

            ))}

          </div>

        </div>


       {/* AI INSIGHTS */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-lg font-semibold mb-4">
AI Financial Insights
</h2>

{insights.length === 0 ? (

<p className="text-gray-400">
No insights available
</p>

) : (

<div className="grid md:grid-cols-2 gap-4">

{insights.map((insight, index) => (

<div
key={index}
className="flex gap-3 items-start p-4 rounded-lg bg-green-50 border border-green-100 hover:shadow transition"
>

<div className="text-green-500 text-xl">
💡
</div>

<p className="text-gray-700 text-sm leading-relaxed">
{insight}
</p>

</div>

))}

</div>

)}

</div>


        {/* FLOATING AI BUTTON */}

        <button
          className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600"
          onClick={()=>navigate("/ai-chat")}
        >

          Ask AI

        </button>

      </div>

    </Layout>

  );

}

export default Dashboard;