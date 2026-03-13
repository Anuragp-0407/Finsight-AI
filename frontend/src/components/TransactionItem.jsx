import { Utensils, Car, ShoppingCart, Wallet } from "lucide-react";

function TransactionItem({ transaction }) {

  const { type, category, amount } = transaction;

  const getIcon = () => {

    const cat = category.toLowerCase();

    if (cat === "food") return <Utensils size={18} />;
    if (cat === "transport") return <Car size={18} />;
    if (cat === "shopping") return <ShoppingCart size={18} />;

    return <Wallet size={18} />;

  };

  return (

    <div className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 border">

      <div className="flex items-center gap-3">

        <div className="bg-gray-100 p-2 rounded-lg">
          {getIcon()}
        </div>

        <div>

          <p className="font-semibold capitalize">
            {category}
          </p>

          <p className="text-sm text-gray-400">
            {type}
          </p>

        </div>

      </div>

      <p
        className={
          type === "income"
            ? "text-green-600 font-semibold"
            : "text-red-500 font-semibold"
        }
      >

        {type === "income" ? "+" : "-"} ₹{amount}

      </p>

    </div>

  );

}

export default TransactionItem;