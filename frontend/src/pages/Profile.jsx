/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import Layout from "../components/Layout";
import API from "../services/api";
import { useEffect, useState } from "react";

import {
User,
Mail,
Wallet,
BarChart3,
Settings,
Lock,
Camera,
LogOut
} from "lucide-react";

function Profile() {

const [user,setUser] = useState(null);
const [avatar] = useState(localStorage.getItem("avatar"));
const [showPasswordModal,setShowPasswordModal] = useState(false)

const [passwordForm,setPasswordForm] = useState({
  currentPassword:"",
  newPassword:""
})

const [passwordMessage,setPasswordMessage] = useState("")


const fetchUser = async ()=>{

try{

const res = await API.get("/auth/me")

setUser(res.data)

}catch(err){

console.log(err)

}

}

useEffect(()=>{

fetchUser()

},[])

const logout = ()=>{

localStorage.removeItem("token")
window.location="/login"

}

const handleUpdateProfile = async()=>{

const newName = prompt("Enter new name")

if(!newName) return

await API.put("/auth/update",{name:newName})

fetchUser()

}
// const handleChangePassword = async()=>{

// const currentPassword = prompt("Enter current password")
// const newPassword = prompt("Enter new password")

// try{

// await API.put("/auth/change-password",{
// currentPassword,
// newPassword
// })

// alert("Password updated")

// } catch(err){
//     console.log(err.response.data);

//     alert("Password change failed")
    
// }
// }
const handlePasswordChange = async (e) => {

  e.preventDefault()

  try{

    const res = await API.put("/auth/change-password",passwordForm)

    setPasswordMessage("Password updated successfully")

    setPasswordForm({
      currentPassword:"",
      newPassword:""
    })

  }catch{

    setPasswordMessage("Password update failed")

  }

}

const uploadAvatar = (e)=>{

const file = e.target.files[0]

const reader = new FileReader()

reader.onload = ()=>{
localStorage.setItem("avatar",reader.result)
}

reader.readAsDataURL(file)

}

if(!user){

return(
<Layout>
<div className="text-center mt-20 text-gray-500">
Loading profile...
</div>
</Layout>
)

}

return(

<Layout>

<div className="max-w-4xl mx-auto space-y-6">

{/* PROFILE HEADER */}

<div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">

<div className="flex items-center gap-4">

<div className="relative">

<div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
    {avatar ? (
        <img src={avatar} 
        alt="avtar"
        className="w-full h-full object-cover"
        />
    ) : (

user.name.charAt(0).toUpperCase()
)}

</div>

<label 
    htmlFor="avatarUpload"
    className = "absolute bottom-0 right bg-white p-1 rounded-full shadow cursor-pointer "
>
    <Camera size={16}/>
</label>

<input
id="avatarUpload"
type="file"
accept="image/*"
onChange={uploadAvatar}
className="hidden"
/>


</div>

<div>

<h2 className="text-2xl font-semibold">
{user.name}
</h2>

<p className="text-gray-500">
{user.email}
</p>

</div>

</div>

<button 
onClick={handleUpdateProfile}
className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">

<Settings size={16}/>
Edit Profile

</button>

</div>


{/* ACCOUNT STATS */}

<div className="grid md:grid-cols-3 gap-4">

<div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">

<Wallet className="text-green-500"/>

<div>

<p className="text-sm text-gray-500">
Transactions
</p>

<p className="font-semibold text-lg">
Active
</p>

</div>

</div>


<div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">

<BarChart3 className="text-blue-500"/>

<div>

<p className="text-sm text-gray-500">
Insights
</p>

<p className="font-semibold text-lg">
Enabled
</p>

</div>

</div>


<div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">

<User className="text-purple-500"/>

<div>

<p className="text-sm text-gray-500">
Account Type
</p>

<p className="font-semibold text-lg">
Standard
</p>

</div>

</div>

</div>


{/* ACCOUNT INFO */}

<div className="bg-white rounded-2xl shadow p-6">

<h3 className="font-semibold text-lg mb-4">
Account Information
</h3>

<div className="grid md:grid-cols-2 gap-6">

<div className="flex items-center gap-3">

<User size={18}/>
<div>
<p className="text-sm text-gray-500">
Name
</p>
<p className="font-medium">
{user.name}
</p>
</div>

</div>

<div className="flex items-center gap-3">

<Mail size={18}/>
<div>
<p className="text-sm text-gray-500">
Email
</p>
<p className="font-medium">
{user.email}
</p>
</div>

</div>

</div>

</div>


{/* SECURITY SETTINGS */}

<div className="bg-white rounded-2xl shadow p-6">

<h3 className="font-semibold text-lg mb-4">
Security
</h3>

<div className="flex items-center justify-between border-b py-3">

<div className="flex items-center gap-3">

<Lock size={18}/>
Change Password

</div>

<button 
onClick={() => setShowPasswordModal(true)}
className="text-green-600 font-medium">

Update

</button>

</div>

<div className="flex items-center justify-between py-3">

<div className="flex items-center gap-3">

<Settings size={18}/>
Account Settings

</div>

<button className="text-green-600 font-medium">

Manage

</button>

</div>

</div>


{/* LOGOUT */}

<button
onClick={logout}
className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
>

<LogOut size={18}/>

Logout

</button>


</div>

{showPasswordModal && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96 shadow-lg">

<h2 className="text-lg font-semibold mb-4">
Change Password
</h2>

<form onSubmit={handlePasswordChange} className="space-y-4">

<input
type="password"
placeholder="Current Password"
value={passwordForm.currentPassword}
onChange={(e)=>setPasswordForm({
  ...passwordForm,
  currentPassword:e.target.value
})}
className="w-full border p-2 rounded"
/>

<input
type="password"
placeholder="New Password"
value={passwordForm.newPassword}
onChange={(e)=>setPasswordForm({
  ...passwordForm,
  newPassword:e.target.value
})}
className="w-full border p-2 rounded"
/>

{passwordMessage && (

<p className="text-sm text-green-600">
{passwordMessage}
</p>

)}

<div className="flex justify-end gap-3">

<button
type="button"
onClick={()=>setShowPasswordModal(false)}
className="px-4 py-2 bg-gray-200 rounded"
>
Cancel
</button>

<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded"
>
Update
</button>

</div>

</form>

</div>

</div>

)}

{showPasswordModal && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96 shadow-lg">

<h2 className="text-lg font-semibold mb-4">
Change Password
</h2>

<form onSubmit={handlePasswordChange} className="space-y-4">

<input
type="password"
placeholder="Current Password"
value={passwordForm.currentPassword}
onChange={(e)=>setPasswordForm({
  ...passwordForm,
  currentPassword:e.target.value
})}
className="w-full border p-2 rounded"
/>

<input
type="password"
placeholder="New Password"
value={passwordForm.newPassword}
onChange={(e)=>setPasswordForm({
  ...passwordForm,
  newPassword:e.target.value
})}
className="w-full border p-2 rounded"
/>

{passwordMessage && (

<p className="text-sm text-green-600">
{passwordMessage}
</p>

)}

<div className="flex justify-end gap-3">

<button
type="button"
onClick={()=>setShowPasswordModal(false)}
className="px-4 py-2 bg-gray-200 rounded"
>
Cancel
</button>

<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded"
>
Update
</button>

</div>

</form>

</div>

</div>

)}

</Layout>

)

}

export default Profile