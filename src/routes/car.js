"use strict";
const router = require("express").Router();
/* ------------------------------------------------------- */

const { isStaffOrisAdmin, isLogin, isAdmin } = require("../middlewares/permissions");
const { list, read, update, del, create } = require("../controllers/car");

// URL: /cars

router
    .route("/")
    .get(isLogin, list)
    .post(isLogin, create)

router
    .route("/:id")
    .get(isLogin, read)
    .put(isStaffOrisAdmin, update)
    .patch(isStaffOrisAdmin, update)
    .delete(isAdmin, del);

/* ------------------------------------------------------- */
module.exports = router;
