"use strict";

const sql = require( "./sql" );
const inert = require( "@hapi/inert" );

module.exports.register = async server => {
   // register plugins
   await server.register( [ sql, inert ] );
};