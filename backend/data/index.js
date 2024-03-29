"use strict";

const events = require( "./events" );
//const rooms = require( "./rooms" );
const sql = require( "mssql" );

const client = async ( server, config ) => {
   let pool = null;

   const closePool = async () => {
       try {
           // try to close the connection pool
           await pool.close();

           // set the pool to null to ensure
           // a new one will be created by getConnection()
           pool = null;
       } catch ( err ) {
           // error closing the connection (could already be closed)
           // set the pool to null to ensure
           // a new one will be created by getConnection()
           pool = null;
           server.log( [ "error", "data" ], "closePool error" );
           server.log( [ "error", "data" ], err );
       }
   };

   const getConnection = async () => {
       try {

           if ( pool ) {
               // has the connection pool already been created?
               // if so, return the existing pool
               return pool;
           }
           // create a new connection pool
           //  pool = await sql.connect( config ); // doesn't work with mssql at localhost
           pool = await sql.connect( `Server=${process.env.SQL_SERVER},${process.env.SQL_PORT};Database=${process.env.SQL_DATABASE};User Id=${process.env.SQL_USER};Password=${process.env.SQL_PASSWORD};Encrypt=${process.env.SQL_ENCRYPT};` );

           // catch any connection errors and close the pool
           pool.on( "error", async err => {
               server.log( [ "error", "data" ], "connection pool error" );
               server.log( [ "error", "data" ], err );
               await closePool();
           } );
           return pool;
       } catch ( err ) {
        console.log("client: getConnection: mssql: pool connection error");

           // error connecting to SQL Server
           server.log( [ "error", "data" ], "error connecting to sql server" );
           server.log( [ "error", "data" ], err );
           pool = null;

       }
   };

   // this is the API the client exposes to the rest
   // of the application
   return {
       events: await events.register( { sql, getConnection } )
   };
};

module.exports = client;
