import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

function MonthlyChart({ data }) {

  return (

    <div className="w-full h-72">

      <ResponsiveContainer width="100%" height="100%">

        <AreaChart data={data}>

          <defs>

            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">

              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>

              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSpend)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

}

export default MonthlyChart;