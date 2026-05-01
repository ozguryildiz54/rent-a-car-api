"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');

module.exports = async (req, res, next) => {

    req.user = null;

    const auth = req?.headers?.authorization; // Bearer ...accessKey...
    const tokenArr = auth ? auth.split(' ') : null; //  ['Bearer', '...accessKey...']

    if (tokenArr && tokenArr[0] === 'Bearer') {

        jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (error, accessData) => {
            
            if (error) next(new CustomError('JWT Error : ' + error.message, 401));
            req.user = accessData ? accessData : null

        });

    }

    next();
}