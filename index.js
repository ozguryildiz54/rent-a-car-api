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

// HomePath — HTML for browsers, JSON for API consumers
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Rent-A-Car API — Ozgur Yildiz</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);min-height:100vh;padding:2rem 1rem;color:#1a1a1a}
  .container{max-width:800px;margin:0 auto;background:white;border-radius:16px;padding:2.5rem;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  h1{font-size:2.5rem;margin-bottom:.5rem}
  .subtitle{color:#666;margin-bottom:2rem}
  .badge{display:inline-block;background:#16a34a;color:white;padding:.25rem .75rem;border-radius:999px;font-size:.85rem;font-weight:600;margin-left:.5rem;vertical-align:middle}
  .creds{background:#dbeafe;border-left:4px solid #2563eb;padding:1rem 1.5rem;border-radius:8px;margin-bottom:2rem}
  .creds strong{display:block;margin-bottom:.5rem;color:#1e3a8a}
  .creds code{background:white;padding:.15rem .5rem;border-radius:4px;font-size:.95rem}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
  .card{background:#f3f4f6;padding:1.25rem;border-radius:8px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
  .card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
  .card .label{font-weight:700;color:#1e40af;margin-bottom:.25rem}
  .card .desc{font-size:.85rem;color:#555}
  .endpoints{background:#1f2937;color:#e5e7eb;padding:1.25rem 1.5rem;border-radius:8px;font-family:"SF Mono",Consolas,monospace;font-size:.85rem;line-height:1.7;overflow-x:auto}
  .endpoints span.m{color:#fbbf24}
  .endpoints span.p{color:#60a5fa}
  footer{margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;color:#6b7280;font-size:.85rem;text-align:center}
  footer a{color:#1e40af}
</style>
</head>
<body>
  <div class="container">
    <h1>🚗 Rent-A-Car API <span class="badge">Live</span></h1>
    <p class="subtitle">REST API for a car rental platform — Express + MongoDB + JWT + Nodemailer + Swagger.</p>

    <div class="creds">
      <strong>🔑 Demo Login</strong>
      Email: <code>demo@demo.com</code> &nbsp; Password: <code>Demo1234!</code> &nbsp; Role: <code>admin</code><br>
      <small style="color:#1e3a8a">Use these in Swagger UI's Authorize dialog or POST to /auth/login</small>
    </div>

    <div class="grid">
      <a class="card" href="/document/swagger"><div class="label">📘 Swagger UI</div><div class="desc">Interactive API explorer</div></a>
      <a class="card" href="/document/redoc"><div class="label">📕 Redoc</div><div class="desc">Beautiful API reference</div></a>
      <a class="card" href="/document/json"><div class="label">📄 OpenAPI JSON</div><div class="desc">Raw spec</div></a>
      <a class="card" href="/cars"><div class="label">🚙 GET /cars</div><div class="desc">Car fleet</div></a>
      <a class="card" href="/reservations"><div class="label">📅 GET /reservations</div><div class="desc">Bookings (auth)</div></a>
      <a class="card" href="https://github.com/ozguryildiz54/rent-a-car-api"><div class="label">⌨ Source Code</div><div class="desc">github.com/ozguryildiz54</div></a>
    </div>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/auth/login</span>           Login → JWT + refresh token
<span class="m">POST</span>   <span class="p">/auth/refresh</span>         Refresh JWT
<span class="m">GET</span>    <span class="p">/cars</span>                 List cars (public)
<span class="m">POST</span>   <span class="p">/cars</span>                 Create car (admin)
<span class="m">PUT</span>    <span class="p">/cars/:id</span>             Update car (admin)
<span class="m">DELETE</span> <span class="p">/cars/:id</span>             Delete car (admin)
<span class="m">GET</span>    <span class="p">/reservations</span>         List reservations (auth)
<span class="m">POST</span>   <span class="p">/reservations</span>         Create reservation (auth)
<span class="m">GET</span>    <span class="p">/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/ozguryildiz54">Ozgur Yildiz</a> · Deployed on Vercel · MongoDB Atlas
    </footer>
  </div>
</body>
</html>`);
  }
  res.json({
    error: false,
    message: "Welcome to RENT A CAR API",
    demo: { email: "demo@demo.com", password: "Demo1234!", role: "admin" },
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

// RUN SERVER (skip on serverless):
if (!process.env.VERCEL) {
  app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
}

module.exports = app;

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
