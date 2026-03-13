import Layout from "../components/Layout";
import API from "../services/api";
import { useEffect,useState } from "react";

function Insights(){
    const [insights,setInsights] = useState([]);

    useEffect(()=>{

    const fetchInsights = async () => {

    try{

    const res = await API.get("/transactions/ai-insights");

    setInsights(res.data.insights || []);

    }catch(err){

    console.log(err);

    }

    };

    fetchInsights();

    },[]);
    

    return(

        <Layout>

        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
        AI Financial Insights
        </h1>


        {/* INSIGHTS CARDS */}

        <div className="space-y-4">

          {insights.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">

          <p>No insights available</p>

        </div>

        ) : (

        insights.map((i,index)=>{

        return(

        <div
            key={index}
            className="bg-white p-6 rounded-xl shadow flex gap-3"
        >

        <div className="text-green-500 text-xl">
        💡
        </div>

        <p className="text-gray-700">
        {i}
        </p>

        </div>

        )

        })

        )}

        </div>


        {/* AI CHAT BUTTON */}

        <button
        className="fixed bottom-20 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg"
        >

        Ask AI

        </button>


        </div>

        </Layout>

    )
}
export default Insights;