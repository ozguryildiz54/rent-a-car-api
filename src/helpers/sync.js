"use strict";
// sync():
const { mongoose } = require("../configs/dbConnection");
const Reservation = require("../models/reservation");
const User = require("../models/user");
const Car = require("../models/car");
const { users, cars, reservations } = require('./dummyData');

module.exports = async function () {

  /* REMOVE DATABASE */
  await mongoose.connection.dropDatabase().then(() => console.log("- Database and all data DELETED!"));

  /* ------------------------- */
  await User.insertMany(users).then(() => console.log('users added'));

  /* ------------------------- */
  await Car.insertMany(cars).then(() => console.log("cars added"));

  /* ------------------------- */
  await Reservation.insertMany(reservations).then(() => console.log("reservations added"));

};
