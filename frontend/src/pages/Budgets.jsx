import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Budgets() {

  const [budgets, setBudgets] = useState([]);
  const [analysis, setAnalysis] = useState([]);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const fetchBudgets = async () => {

    try {

      const res = await API.get("/budget");

      setBudgets(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchBudgetAnalysis = async () => {

    try {

      const res = await API.get("/budget/analysis");

      setAnalysis(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/budget", form);

      fetchBudgets();
      fetchBudgetAnalysis();

      setForm({
        category: "",
        amount: "",
        month: ""
      });

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

  const loadBudgets = async () => {

    try {

      const budgetRes = await API.get("/budget");
      const analysisRes = await API.get("/budget/analysis");

      setBudgets(budgetRes.data);
      setAnalysis(analysisRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  loadBudgets();

}, []);

  return (

    <Layout>

      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Budget Manager
        </h1>

        {/* Add Budget Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
        >

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="number"
            name="amount"
            placeholder="Budget Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="month"
            placeholder="Month (example: March)"
            value={form.month}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Set Budget
          </button>

        </form>


        {/* Budget List */}

        <h2 className="text-xl font-semibold mb-4">
          Your Budgets
        </h2>

        <div className="space-y-4 mb-8">

          {budgets.map((b) => (

            <div
              key={b._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <div>

                <p className="font-semibold">
                  {b.category}
                </p>

                <p className="text-gray-500 text-sm">
                  {b.month}
                </p>

              </div>

              <p className="font-semibold text-green-600">
                ₹ {b.amount}
              </p>

            </div>

          ))}

        </div>


        {/* Budget Analysis */}

        <h2 className="text-xl font-semibold mb-4">
          Budget Analysis
        </h2>

        <div className="space-y-4">

          {analysis.map((a, index) => {

            const percentage = Math.min(
              (a.spent / a.budget) * 100,
              100
            );

            return (

              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow"
              >

                <div className="flex justify-between mb-2">

                  <p className="font-semibold">
                    {a.category}
                  </p>

                  <p className="text-gray-600">
                    ₹ {a.spent} / ₹ {a.budget}
                  </p>

                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">

                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </Layout>

  );

}

export default Budgets;