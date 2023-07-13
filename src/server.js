const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
const APIMySQL = require('./routes/RouterMysql');

app.set('port', process.env.PORT || 8000)

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(morgan());
app.use('/api', APIMySQL);


app.listen(app.get('port'), () => {
    console.log("Running server in", app.get('port'));
});