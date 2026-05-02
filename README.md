# Rent-A-Car API

REST API for a car rental platform — Express + MongoDB + JWT + Nodemailer + Swagger.

> 🔗 **Live API:** https://ozguryildiz-rentacar-api.vercel.app
> 📘 **Live Swagger UI:** https://ozguryildiz-rentacar-api.vercel.app/document/swagger
> 📕 **Live Redoc:** https://ozguryildiz-rentacar-api.vercel.app/document/redoc
> 🔑 **Demo login:** `demo@demo.com` / `Demo1234!` (admin + staff)

## ✨ Features

- JWT + Token-based authentication
- Role-based permissions (admin / staff / user)
- Email notifications (Nodemailer)
- Unique field validation (mongoose-unique-validator)
- Pagination, sorting, search, filtering middleware
- Reservation logic — date overlap check, auto amount calculation
- Swagger + Redoc API documentation

## 🧰 Stack

`Node.js` · `Express` · `MongoDB` · `Mongoose` · `JWT` · `Nodemailer` · `Swagger` · `Redoc`

## 🌐 Try It

```bash
# Login (no auth needed)
curl -X POST https://ozguryildiz-rentacar-api.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@demo.com","password":"Demo1234!"}'

# List cars (auth required — paste token from login above)
curl https://ozguryildiz-rentacar-api.vercel.app/cars \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🛠 Run Locally

```bash
git clone https://github.com/ozguryildiz54/rent-a-car-api.git
cd rent-a-car-api
npm install
cp .env-sample .env  # add MONGODB connection string + JWT secrets
npm run dev
```

App runs on `http://localhost:8000`.

## 📦 Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Register |
| POST | `/auth/refresh` | Refresh JWT |
| GET/POST/PUT/DELETE | `/users` | User CRUD (admin/staff) |
| GET/POST/PUT/DELETE | `/cars` | Car CRUD |
| GET/POST/PUT/DELETE | `/reservations` | Reservation CRUD |

Full docs at `/document/swagger`.

---

Deployed on Vercel. MongoDB hosted on Atlas free tier. Sample data seeded: 6 cars (Tesla, BMW, Toyota, Ford, Honda, Jeep), 5 reservations.
