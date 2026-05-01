"use strict";


/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Middleware: permissions
const CustomError = require("../helpers/customError");
const message = "Your account is not active. Please contact support.";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      throw new CustomError(
        "AuthenticationError: You must be logged in to access this resource.", 403
      );
    }
  },
  isStaffOrisAdmin: (req, res, next) => {
    if (!(req.user?.isActive && (req.user.isAdmin || req.user.isStaff))) {
      throw new CustomError(
        "AuthorizationError: You must be an Admin or Staff to access this resource.", 403
      );
    }
    next();
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw new CustomError(
        "AuthorizationError: You must be an Admin to access this resource.", 403
      );
    }
  },
};
