const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


// create express app
const app = express();
app.use(cors({credentials: true, origin: true}))
//app.options('*', cors())
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'https://localhost:9001');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Backend Api for Gw cleaners..."});
});

require('./app/routes/Cards.js')(app);
require('./app/routes/Dropboxes.js')(app);
require('./app/routes/Pricelist.js')(app);
require('./app/routes/Notifications.js')(app);
require('./app/routes/Orders.js')(app);
require('./app/routes/Transactions.js')(app);
require('./app/routes/Users.js')(app);

// listen for requests
app.listen(process.env.PORT || 9001, () => {
    console.log("Server is listening on port 9001");
});
