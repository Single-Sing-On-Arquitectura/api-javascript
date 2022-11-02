const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/**
 * Importo rutas a usar en el servidor
 */
const loginRouters = require('./controller/LoginCtr')

/**
 * configuro las rutas del servidor
 */
app.use('/', loginRouters)

module.exports = app;