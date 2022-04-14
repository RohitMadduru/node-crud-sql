const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const home = require('./routes/home');
const employees = require('./routes/employees');

//using pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

//consoling the routes for Debugging
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log(" --- Morgan Enabled --- ");
}

// Using the Routes
app.use("/", home);
app.use("/api/employees/", employees);

//  Creating a Default Environment Port and Running it
const port = process.env.PORT = 3000;
app.listen(port, () => console.log(` --- Listning on port ${port} ---`));

