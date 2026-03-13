import { Link } from "react-router-dom";
import { Home, BarChart3, Wallet, User } from "lucide-react";

function MobileNav(){

return(

<div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 lg:hidden">

<Link to="/dashboard">
<Home size={20}/>
</Link>

<Link to="/insights">
<BarChart3 size={20}/>
</Link>

<Link to="/budgets">
<Wallet size={20}/>
</Link>

<Link to="/profile">
<User size={20}/>
</Link>

</div>

)

}

export default MobileNav;