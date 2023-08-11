require("express-async-errors");
const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/AppError');

const app = express();

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

const PORT = 3000;


app.listen(PORT, () => console.log(`Server in running on Port ${3000}`));