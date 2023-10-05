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

    const addEventToRoom = async (roomId, eventBody) => {


      // get a connection to SQL Server
      const cnx = await getConnection();

      // console.log( cnx, "error connecting to sql server",eventId );
      // create a new request
      const request = await cnx.request();

      // {
      //    "organizer"    : "Mr. Organizer"
      //   ,"description"  : "We should all come in peace."
      //   ,"startTime"    : "2023-10-04 20:00:00"
      //   ,"endTime"      : "2023-10-04 20:30:00"
      //   ,"subject"      : "Lets Get It On"
      // }

      // configure sql query parameters
      request.input( "room",        sql.Int, roomId );
      request.input( "organizer",   sql.VarChar, eventBody.organizer );
      request.input( "description", sql.VarChar, eventBody.description );
      request.input( "startTime",   sql.DateTime, eventBody.startTime );
      request.input( "endTime",     sql.DateTime, eventBody.endTime );
      request.input( "subject",     sql.VarChar, eventBody.subject );

      // return the executed query
      return request.query( sqlQueries.addEventToRoom );
  };
   return {
       getEvents,
       getRoomInfo,
       getParticipants,
       addEventToRoom
   };
};

module.exports = { register };
