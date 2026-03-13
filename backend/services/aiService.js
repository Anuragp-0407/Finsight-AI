import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function financialChat(question, transactions,budgets){

const prompt = `
User transactions:
${JSON.stringify(transactions)}

User Budget:
${JSON.stringify(budgets)}

User question:
${question}

Use both transactions and budgets to answer.
All money is in indian rupee so use this symbol for showing money ₹

Give short and clear financial advice.
`;

const completion = await client.chat.completions.create({
  model: "Llama-3.3-70B-Versatile",
  messages: [
    { role: "user", content: prompt }
  ]
});

return completion.choices[0].message.content;

}

export async function generateInsights(transactions) {

  if (!transactions || transactions.length === 0) {
    return ["No transactions available to generate insights"];
  }

  const prompt = `
You are a financial assistant.

Analyze these transactions and generate EXACTLY 4 short insights.

Transactions:
${JSON.stringify(transactions)}

Rules:
- Each insight must be ONE sentence
- Do NOT add explanations
- Return ONLY a JSON array
- All money is in indian rupee so use this symbol for showing money ₹

Example:
[
"Food is your highest spending category",
"Transport expenses increased this month",
"You spent 30% more than last month",
"Consider setting a food budget"
]
`;

  const completion = await client.chat.completions.create({
    model: "Llama-3.3-70B-Versatile",
    messages: [{ role: "user", content: prompt }]
  });

  const text = completion.choices[0].message.content;

  try {
    return JSON.parse(text);
  } catch {
    return [text];
  }

}