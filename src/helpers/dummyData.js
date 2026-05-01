module.exports.users = [
  {
    "_id": "64c5ed12345a123456789011",
    "username": "admin",
    "password": "aA*12345",
    "email": "admin@example.com",
    "isActive": true,
    "isAdmin": true,
    "isStaff": false
  },
  {
    "_id": "64c5ed12345a123456789012",
    "username": "staff",
    "password": "aA*12345",
    "email": "staff@example.com",
    "isActive": true,
    "isAdmin": false,
    "isStaff": true
  },
  {
    "_id": "64c5ed12345a123456789013",
    "username": "normal",
    "password": "aA*12345",
    "email": "normal@example.com",
    "isActive": true,
    "isAdmin": false,
    "isStaff": false
  },
  {
    "_id": "64c5ed12345a123456789014",
    "username": "normal1",
    "password": "aA*12345",
    "email": "normal1@example.com",
    "isActive": true,
    "isAdmin": false,
    "isStaff": false
  },
  {
    "_id": "64c5ed12345a123456789015",
    "username": "banned",
    "password": "aA*12345",
    "email": "banned@example.com",
    "isActive": false,
    "isAdmin": false,
    "isStaff": false
  }
]

module.exports.cars = [
  {
    "plateNumber": "06ABC123",
    "brand": "Ford",
    "model": "Focus",
    "year": 2025,
    "isAutomatic": true,
    "pricePerDay": 50,
    "isPublish": true,
    "creatorId": "64c5ed12345a123456789011",
    "updatorId": "64c5ed12345a123456789011",
    "_id": "64c5ed12345a12345678901a"
  },
  {
    "plateNumber": "06ABC124",
    "brand": "Renault",
    "model": "Megane",
    "year": 2022,
    "isAutomatic": false,
    "pricePerDay": 60,
    "isPublish": true,
    "creatorId": "64c5ed12345a123456789011",
    "updatorId": "64c5ed12345a123456789011",
    "_id": "64c5ed12345a12345678901b"
  },
  {
    "plateNumber": "06ABC125",
    "brand": "Cherry",
    "model": "Tiggo8",
    "year": 2024,
    "isAutomatic": true,
    "pricePerDay": 100,
    "isPublish": true,
    "creatorId": "64c5ed12345a123456789012",
    "updatorId": "64c5ed12345a123456789012",
    "_id": "64c5ed12345a12345678901c"
  },
  {
    "plateNumber": "06ABC126",
    "brand": "Honda",
    "model": "Accord",
    "year": 2023,
    "isAutomatic": true,
    "pricePerDay": 120,
    "isPublish": true,
    "creatorId": "64c5ed12345a123456789012",
    "updatorId": "64c5ed12345a123456789012",
    "_id": "64c5ed12345a12345678901d"
  },
  {
    "plateNumber": "06ABC127",
    "brand": "Hyundai",
    "model": "Tucson",
    "year": 2023,
    "isAutomatic": true,
    "pricePerDay": 110,
    "isPublish": false,
    "creatorId": "64c5ed12345a123456789012",
    "updatorId": "64c5ed12345a123456789012",
    "_id": "64c5ed12345a12345678901e"
  },
  {
    "plateNumber": "06ABC128",
    "brand": "VW",
    "model": "Golf",
    "year": 2024,
    "isAutomatic": true,
    "pricePerDay": 100,
    "isPublish": true,
    "creatorId": "64c5ed12345a123456789012",
    "updatorId": "64c5ed12345a123456789012",
    "_id": "64c5ed12345a12345678901f"
  }
]

module.exports.reservations = [
  {
    "userId": "64c5ed12345a123456789013",
    "carId": "64c5ed12345a12345678901a",
    "startDate": "2025-10-10",
    "endDate": "2025-10-16",
    "amount": 300,
    "creatorId": "64c5ed12345a123456789013",
    "updatorId": "64c5ed12345a123456789013"
  },
  {
    "userId": "64c5ed12345a123456789013",
    "carId": "64c5ed12345a12345678901a",
    "startDate": "2025-10-17",
    "endDate": "2025-10-18",
    "amount": 50,
    "creatorId": "64c5ed12345a123456789013",
    "updatorId": "64c5ed12345a123456789012"
  },
  {
    "userId": "64c5ed12345a123456789014",
    "carId": "64c5ed12345a12345678901b",
    "startDate": "2025-10-14",
    "endDate": "2025-10-20",
    "amount": 300,
    "creatorId": "64c5ed12345a123456789014",
    "updatorId": "64c5ed12345a123456789014"
  },
  {
    "userId": "64c5ed12345a123456789013",
    "carId": "64c5ed12345a12345678901c",
    "startDate": "2025-10-21",
    "endDate": "2025-10-29",
    "amount": 400,
    "creatorId": "64c5ed12345a123456789013",
    "updatorId": "64c5ed12345a123456789013"
  },
  {
    "userId": "64c5ed12345a123456789013",
    "carId": "64c5ed12345a12345678901c",
    "startDate": "2025-10-13",
    "endDate": "2025-10-15",
    "amount": 100,
    "creatorId": "64c5ed12345a123456789013",
    "updatorId": "64c5ed12345a123456789013"
  },
  {
    "userId": "64c5ed12345a123456789013",
    "carId": "64c5ed12345a12345678901c",
    "startDate": "2025-10-11",
    "endDate": "2025-10-12",
    "amount": 50,
    "creatorId": "64c5ed12345a123456789013",
    "updatorId": "64c5ed12345a123456789013"
  },
  {
    "userId": "64c5ed12345a123456789014",
    "carId": "64c5ed12345a12345678901f",
    "startDate": "2025-10-23",
    "endDate": "2025-10-25",
    "amount": 100,
    "creatorId": "64c5ed12345a123456789012",
    "updatorId": "64c5ed12345a123456789012"
  }
]
