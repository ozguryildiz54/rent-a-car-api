"use strict";

const Car = require("../models/car");
const dateValidation = require('../helpers/dateValidation');
const Reservation = require('../models/reservation');

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "List Cars"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */

    const { startDate: QStartDate, endDate: QEndDate } = req.body;

    dateValidation(QStartDate, QEndDate);

    //? Musait olmayan tum araclari bir array seklinde getir
    const reservedCarIds = await Reservation.find({
      startDate: { $lte: QEndDate },
      endDate: { $gte: QStartDate }
    }, { _id: 0, carId: 1 }).distinct('carId');

    //? Musait araclari ve rezervasyonu olmayan araclari listele egerki kullanici musteriyse
    const customFilter = { isPublish: true, _id: { $nin: reservedCarIds } }

    if (req.user.isAdmin || req.user.isStaff) {
      delete customFilter.isPublish
    }

    const data = await res.getModelList(Car, customFilter, [
      { path: 'creatorId', select: 'username' },
      { path: 'updatorId', select: 'username' },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car),
      data,
    });
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "Create a Car"
      #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
          $ref: "#/definitions/Car"
        }
      }
    */

    //? creatorId ve updatorId ekle
    const currentUserId = req.user._id
    req.body.creatorId = currentUserId
    req.body.updatorId = currentUserId

    const data = await Car.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "Get Single Car"
    */


    const data = await Car.findOne({ _id: req.params.id }).populate([
      { path: 'creatorId', select: 'username' },
      { path: 'updatorId', select: 'username' },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "Update Car"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            $ref: "#/definitions/Car"
        }
      }
    */

    //? updatorId ekle
    req.body.updatorId = req.user._id;

    const data = await Car.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    res.status(202).send({
      error: false,
      data,
    });
  },

  del: async (req, res) => {
    /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "Delete Car"
    */

    const data = await Car.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
