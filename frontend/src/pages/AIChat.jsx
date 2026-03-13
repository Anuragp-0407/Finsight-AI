import Layout from "../components/Layout";
import API from "../services/api";
import { useState, useRef, useEffect } from "react";

function AIChat() {

const [message, setMessage] = useState("");
const [chat, setChat] = useState([]);

const chatEndRef = useRef(null);

const scrollToBottom = () => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [chat]);

/* SEND MESSAGE */

const handleSend = async () => {

  if (!message.trim()) return;

  const userMessage = message;

  // show user message
  setChat(prev => [
    ...prev,
    { role: "user", text: userMessage }
  ]);

  setMessage("");

  try {

    const res = await API.post("/transactions/ai-chat", {
      message: userMessage
    });

    const aiReply = res.data?.reply || "AI returned no response.";

    // show AI response
    setChat(prev => [
      ...prev,
      { role: "ai", text: aiReply }
    ]);

  } catch (err) {

    console.log("AI error:", err.response?.data || err);

    setChat(prev => [
      ...prev,
      { role: "ai", text: "AI failed to respond." }
    ]);

  }

};

/* FORMAT AI RESPONSE */

const formatAIResponse = (text) => {

  if (!text) return text;

  const lines = text.split("\n");

  return lines.map((line, index) => {

    if (line.match(/^\d+\./)) {
      return (
        <li key={index} className="ml-4 list-decimal">
          {line.replace(/^\d+\.\s*/, "")}
        </li>
      );
    }

    if (line.includes(":")) {
      const [title, content] = line.split(":");
      return (
        <p key={index}>
          <span className="font-semibold text-green-600">{title}:</span> {content}
        </p>
      );
    }

    return <p key={index}>{line}</p>;
  });

};

return (

<Layout>

<div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col h-[80vh]">

<h1 className="text-2xl font-bold mb-4">
AI Financial Assistant
</h1>

{/* CHAT AREA */}

<div className="flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto space-y-4">

{chat.length === 0 && (

<p className="text-gray-400 text-center mt-10">
Ask AI about your finances
</p>

)}

{chat.map((msg, index) => (

<div
key={index}
className={msg.role === "user" ? "text-right" : "text-left"}
>

<div
className={
msg.role === "user"
? "inline-block bg-green-500 text-white px-4 py-2 rounded-lg"
: "inline-block bg-gray-200 px-4 py-2 rounded-lg"
}
>

{msg.role === "ai"
? formatAIResponse(msg.text)
: msg.text}

</div>

</div>

))}

<div ref={chatEndRef}></div>

</div>

{/* INPUT AREA */}

<div className="flex gap-2 mt-4">

<input
type="text"
value={message}
onChange={(e) => setMessage(e.target.value)}
onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}}
placeholder="Ask about your finances..."
className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

<button
onClick={handleSend}
className="bg-green-500 text-white px-6 rounded-lg hover:bg-green-600 transition"
>

Send

</button>

</div>

</div>

</Layout>

);

}

export default AIChat;