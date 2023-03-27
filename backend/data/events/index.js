"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "events" );

  // console.log( cnx, "error connecting to sql server" );

   const getEvents = async roomId => {


       // get a connection to SQL Server
       const cnx = await getConnection();

       // console.log( cnx, "error connecting to sql server",roomId );
       // create a new request
      //  while (cnx.state === "Connecting") {
      //       console.log("waiting for connection");
      //     if (cnx.state === "Connected") {
      //         break;
      //     } else if (cnx.state === "Disconnected") {
      //         cnx.connect();
      //     }
      //   }

       const request = await cnx.request();

       // configure sql query parameters
       request.input( "room", sql.Int, roomId );

       // return the executed query
       return request.query( sqlQueries.getEvents );
   };

   const getRoomInfo = async roomId => {


    // get a connection to SQL Server
    const cnx = await getConnection();

    // console.log( cnx, "error connecting to sql server",roomId );
    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input( "room", sql.Int, roomId );

    // return the executed query
    return request.query( sqlQueries.getRoomInfo );
};
    const getParticipants = async eventId => {


        // get a connection to SQL Server
        const cnx = await getConnection();

        // console.log( cnx, "error connecting to sql server",eventId );
        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input( "eventId", sql.Int, eventId );

        // return the executed query
        return request.query( sqlQueries.getParticipants );
    };

   return {
       getEvents,
       getRoomInfo,
       getParticipants
   };
};

module.exports = { register };
