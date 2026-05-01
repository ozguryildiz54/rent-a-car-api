"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// Nested Query
app.set("query parser", "extended");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to RENT A CAR API",
    documents: {
      swagger: "/document/swagger",
      redoc: "/document/redoc",
      json: "/document/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

// not Found
app.all("/*splat", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
