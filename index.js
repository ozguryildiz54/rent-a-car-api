"use strict";
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

// HomePath: HTML for browsers, JSON for API consumers
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Rent-A-Car API | Ozgur Yildiz</title>
<meta property="og:title" content="Rent-A-Car API, a backend project by Ozgur Yildiz" />
<meta property="og:description" content="The back end of a car rental platform: secure login, fleet management, and reservations with double-booking checks. Live demo with interactive API docs." />
<meta property="og:image" content="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=630&fit=crop" />
<meta property="og:url" content="https://ozguryildiz-rentacar-api.vercel.app" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Rent-A-Car API, a backend project" />
<meta name="twitter:description" content="The back end of a car rental platform, with interactive API docs." />
<meta name="twitter:image" content="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=630&fit=crop" />
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);min-height:100vh;padding:2rem 1rem;color:#1a1a1a}
  .container{max-width:760px;margin:0 auto;background:white;border-radius:16px;padding:2.5rem;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  h1{font-size:2.25rem;margin-bottom:.5rem;line-height:1.15}
  .subtitle{color:#555;margin-bottom:1.75rem;font-size:1.05rem;line-height:1.55}
  .badge{display:inline-block;background:#16a34a;color:white;padding:.2rem .7rem;border-radius:999px;font-size:.8rem;font-weight:600;margin-left:.4rem;vertical-align:middle}
  .primary-btn{display:block;text-align:center;background:#1e40af;color:white;text-decoration:none;font-weight:700;font-size:1.05rem;padding:1rem 1.5rem;border-radius:10px;transition:transform .15s,box-shadow .15s}
  .primary-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(30,64,175,.35)}
  .creds-line{text-align:center;color:#555;font-size:.9rem;margin:.85rem 0 2rem}
  .creds-line code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px;font-size:.85rem}
  .section-title{font-size:1.15rem;margin-bottom:1rem;color:#1e40af}
  .feature-list{list-style:none;margin-bottom:2rem}
  .feature-list li{padding:.55rem 0 .55rem 1.6rem;position:relative;color:#444;line-height:1.5;border-bottom:1px solid #f0f0f0}
  .feature-list li:last-child{border-bottom:none}
  .feature-list li:before{content:"✓";position:absolute;left:0;color:#16a34a;font-weight:700}
  .feature-list strong{color:#1a1a1a}
  .divider{border:none;border-top:1px solid #e5e7eb;margin:2rem 0}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
  .card{background:#f3f4f6;padding:1.25rem;border-radius:8px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
  .card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
  .card .label{font-weight:700;color:#1e40af;margin-bottom:.25rem}
  .card .desc{font-size:.85rem;color:#555}
  .dev-note{color:#6b7280;font-size:.85rem;margin-bottom:1rem}
  .dev-note code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px}
  .dev-note a{color:#1e40af}
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
    <p class="subtitle">The back end of a car rental platform. It manages the car fleet, customer accounts and bookings, and checks that the same car is never double-booked.</p>

    <a class="primary-btn" href="/document/swagger">▶  Explore the API</a>
    <p class="creds-line">Demo login: <code>demo@demo.com</code> / <code>Demo1234!</code> &nbsp; (use these in the Swagger "Authorize" box)</p>

    <h2 class="section-title">What this project shows</h2>
    <ul class="feature-list">
      <li><strong>Secure login</strong> with role-based access for admin and customer users.</li>
      <li><strong>Car fleet management</strong> for the vehicles available to rent.</li>
      <li><strong>Reservations with double-booking checks</strong> that detect overlapping dates.</li>
      <li><strong>Automatic price calculation</strong> based on the rental dates.</li>
      <li><strong>Interactive API documentation</strong> built with Swagger and Redoc.</li>
    </ul>

    <hr class="divider"/>

    <h2 class="section-title">For developers</h2>
    <div class="grid">
      <a class="card" href="/document/swagger"><div class="label">📘 Swagger UI</div><div class="desc">Interactive API explorer</div></a>
      <a class="card" href="/document/redoc"><div class="label">📕 Redoc</div><div class="desc">API reference</div></a>
      <a class="card" href="https://github.com/yldzozgur/rent-a-car-api"><div class="label">⌨ Source code</div><div class="desc">github.com/yldzozgur</div></a>
    </div>

    <p class="dev-note">Demo credentials for direct API calls: <code>demo@demo.com</code> / <code>Demo1234!</code> &nbsp; OpenAPI spec: <a href="/document/json">/document/json</a></p>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/auth/login</span>           Login, returns JWT + refresh token
<span class="m">GET</span>    <span class="p">/cars</span>                 List cars (public)
<span class="m">POST</span>   <span class="p">/cars</span>                 Create car (admin)
<span class="m">PUT</span>    <span class="p">/cars/:id</span>             Update car (admin)
<span class="m">GET</span>    <span class="p">/reservations</span>         List reservations (auth)
<span class="m">POST</span>   <span class="p">/reservations</span>         Create reservation (auth)
<span class="m">GET</span>    <span class="p">/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/yldzozgur">Ozgur Yildiz</a> · Node + Express · MongoDB Atlas · deployed on Vercel
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
