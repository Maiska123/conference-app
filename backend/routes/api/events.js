"use strict";

module.exports.register = async server => {
   server.route( {
       method: "GET",
       path: "/api/events/{roomId}",
       config: {
           handler: async request => {
               try {
                   // get the sql client registered as a plugin
                   const db = request.server.plugins.sql.client;

                   // execute the query
                   const res = await db.events.getEvents( request.params.roomId );

                   // return the recordset object
                   return res.recordset;
               } catch ( err ) {
                   console.log( err );
               }
           }
       }
   } );

   server.route( {
    method: "GET",
    path: "/api/rooms/{roomId}",
    config: {
        handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // execute the query
                    const res = await db.events.getRoomInfo( request.params.roomId );

                    // return the recordset object
                    return res.recordset;
                } catch ( err ) {
                    console.log( err );
                }
            }
        }
    } );
    server.route( {
        method: "GET",
        path: "/api/events/{eventId}/participants",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // execute the query
                    const res = await db.events.getParticipants( request.params.eventId );

                    // return the recordset object
                    return res.recordset;
                } catch ( err ) {
                    console.log( err );
                }
            }
        }
    } );
    server.route( {
      method: "POST",
      path: "/api/rooms/{roomId}/add/event",
      config: {
          handler: async request => {
              try {
                  // get the sql client registered as a plugin
                  const db = request.server.plugins.sql.client;

                  // execute the query
                  const res = await db.events.addEventToRoom( request.params.roomId, request.payload );

                  console.log( res );
                  // return the recordset object
                  return 200;
              } catch ( err ) {
                  console.log( err );
                  return {statuscode: 501, error: err}
              }
          }
      }
  } );
};


// TODO: Get the current authenticate user's ID
// const roomId = 2;
