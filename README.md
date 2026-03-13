# FinSight AI

FinSight AI is an AI-powered personal finance manager that helps users track their income, expenses, and budgets while providing intelligent financial insights using AI.

## Features

- User authentication (JWT)
- Add income and expenses
- Category-wise expense tracking
- Budget management
- AI-powered financial insights
- AI financial assistant chat
- Interactive dashboard with charts
- Responsive UI

## Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Axios
- Recharts

Backend:
- Node.js
- Express.js

Database:
- MongoDB
- Mongoose

AI Integration:
- Groq API (LLaMA models)

## Project Structure

FinsightAI  
├── backend  
│ ├── controllers  
│ ├── models  
│ ├── routes  
│ ├── middleware  
│ ├── services  
│ └── server.js  

├── frontend  
│ ├── src  
│ │ ├── components  
│ │ ├── pages  
│ │ └── services  

## Installation

Clone repository

git clone https://github.com/YOUR_USERNAME/Finsight-ai.git

Install backend dependencies

cd backend  
npm install  

Create `.env` file

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret  
GROQ_API_KEY=your_api_key  

Run backend

npm run dev  

Install frontend dependencies

cd frontend  
npm install  
npm run dev  

## Author

Anurag Pandey
