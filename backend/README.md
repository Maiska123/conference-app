# ConferenceApp - backend

### Node.js - _express_
### HAPI framework - _@hapi/hapi_
### mssql database - _mssql_

----
#### usage instructions
* have the latest node.js installed (or at least 14)
* run `npm install` to install dependencies (i prefer yarn, but npm is fine)
* `npm run dev` to start the server in development mode (nodemon is used)




**routes:**
* `GET /` - returns a welcome message
* `GET /api/rooms/:id` - returns a room by id
* `GET /api/events/:id` - returns an event by id
* `GET /api/events/{eventId}/participants` - returns all participants of an event

