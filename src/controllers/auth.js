"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const CustomError = require('../helpers/customError');
const passwordValidation = require('../helpers/passwordValidation');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA12345.?",
                }
            }
        */

        const { username, email, password } = req.body;

        if (!((username || email) && password)) throw new CustomError('Username/Email and Password are required.', 401);

        const user = await User.findOne({ $or: [{ username }, { email }], password });

        if (!user) throw new CustomError('Incorrect Username/Email or Password.', 401);

        if (!user.isActive) throw new CustomError('This account is not active.', 401);

        // JWT
        const accessData = { _id: user._id, username: user.username, isActive: user.isActive, isAdmin: user.isAdmin, isStaff: user.isStaff };

        // jwt.sign(payload, accessKey, options)
        const access = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '15m' });

        const refresh = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY, { expiresIn: '1d' });
        // JWT

        res.status(200).send({
            error: false,
            bearer: { access, refresh }
        });
    },

    register: async (req, res) => {
        /*
          #swagger.tags = ["Authentication"]
          #swagger.summary = "Register User"
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

        passwordValidation(req?.body?.password);
        const data = await User.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    logout: async (req, res) => {
        /*
           #swagger.tags = ["Authentication"]
           #swagger.summary = "Logout"
        */

        res.status(200).send({
            error: false,
            message: 'User logout success You can delete token from your session.'
        });
    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    refresh: '...refreshToken...'
                }
            }
        */

        const { refresh } = req.body;

        if (!refresh) throw new CustomError('Refresh Token not Fount.', 401);

        const refreshData = jwt.verify(refresh, process.env.REFRESH_KEY);

        if (!refreshData) throw new CustomError('JWT Refresh Token is wrong.');

        const user = await User.findById(refreshData._id);

        if (!user) throw new CustomError('User is not found with given Id.', 404);

        if (!user.isActive) throw new CustomError('This account is not active.', 401);

        const accessData = { _id: user._id, username: user.username, isActive: user.isActive, isAdmin: user.isAdmin, isStaff: user.isStaff };

        const access = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '15m' });

        res.status(200).send({
            error: false,
            access
        })

    }
}