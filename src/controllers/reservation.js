"use strict";
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Reservation = require("../models/reservation");
const CustomError = require("../helpers/customError");
const dateValidation = require("../helpers/dateValidation");
const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "List Reservations"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */

    //? eger user admin veya staff degilse sadece kendisine ait olan rezervasyonlari goster

    const isAdminOrStaf = req.user.isAdmin || req.user.isStaff; // Boolean
    let customFilter = { userId: req.user._id };

    isAdminOrStaf && delete customFilter.userId

    const data = await res.getModelList(Reservation, customFilter, [
      { path: 'userId', select: 'username firstName lastName' },
      { path: 'carId', select: 'brand model' },
      { path: 'updatorId', select: 'username' },
      { path: 'creatorId', select: 'username' },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation, customFilter),
      data,
    });
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Create a Car"
      #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
          $ref: "#/definitions/Reservation"
        }
      }
    */

    //? egerki current user admin veya staff degilse, creatorId; mustrenin id'si olmali.
    const isAdminOrStaf = req.user.isAdmin || req.user.isStaff;
    const currentUserId = req.user._id
    const { carId } = req.body

    let userId = req.body.userId
    if (!isAdminOrStaf) {
      req.body.userId = currentUserId;
      userId = currentUserId
    };

    //? Istenilen arac verilen tarih araliginda musait mi ?

    const { startDate: QStartDate, endDate: QEndDate } = req.body;

    const [totalDays] = dateValidation(QStartDate, QEndDate);

    const isCarReseverd = await Reservation.find({
      $or: [
        {
          carId,
          startDate: { $lte: QEndDate },
          endDate: { $gte: QStartDate }
        },
        {
          userId,
          startDate: { $lte: QEndDate },
          endDate: { $gte: QStartDate }
        }
      ]
    });

    if (isCarReseverd.length > 0) throw new CustomError('The car is already reserved or User already reserved a car for given dates ');

    //? amount sectigi aracin gunluk fiyatiyle kiralagi gun sayini carparak hesapla

    const { pricePerDay } = await Car.findById(carId, { _id: 0, pricePerDay: 1 });

    req.body.amount = pricePerDay * totalDays;
    req.body.creatorId = currentUserId;
    req.body.updatorId = currentUserId;
    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Get Single Reservation"
    */

    //? eger user admin veya staff degilse sadece kendisine ait olan rezervasyonu goster

    const isAdminOrStaff = req.user.isAdmin || req.user.isStaff;

    const customFilter = { userId: req.user._id, _id: req.params.id };

    isAdminOrStaff && delete customFilter.userId;

    const data = await Reservation.findOne(customFilter).populate([
      { path: 'userId', select: 'username firstName lastName' },
      { path: 'carId', select: 'brand model' },
      { path: 'updatorId', select: 'username' },
      { path: 'creatorId', select: 'username' },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Update Reservation"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            "username": "test",
            "password": "1234",
            "email": "test@site.com",
            "isActive": true,
            "isStaff": false,
            "isAdmin": false,
        }
      }
    */

    req.body.updatorId = currentUserId;
    const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    res.status(202).send({
      error: false,
      data,
    });
  },

  del: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Delete Reservation"
    */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
