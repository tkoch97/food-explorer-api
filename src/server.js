require("dotenv/config");
require("express-async-errors");
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ["https://food-explorer-front-eosin.vercel.app", "http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    }); 
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server Error"
  });
});

const PORT = process.env.SERVER_PORT || 3000;


app.listen(PORT, () => console.log(`Server in running on Port ${PORT}`));