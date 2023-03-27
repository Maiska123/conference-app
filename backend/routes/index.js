"use strict";

const api = require( "./api" );

module.exports.register = async server => {

   // register api routes
   await api.register( server );


   server.route( {
       method: "GET",
       path: "/",
       handler: async ( request, h ) => {
           return "Welcome to the backend of this server. We will give you a conferenceroom data.";
       }
   } );
};