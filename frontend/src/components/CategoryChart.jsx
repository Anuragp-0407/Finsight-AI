import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function CategoryChart({ data }) {

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28CFF"
  ];

  return (

    <PieChart width={400} height={300}>

      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >

        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}

      </Pie>

      <Tooltip />
      <Legend />

    </PieChart>

  );
}

export default CategoryChart;