

//Set dependencies by stating them in const
const express = require('express');
const cors = require('cors');
const app = express();

const port = 8000;


//Set up routes
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config"); //Connect to database
require("./routes/vehicle.routes")(app); //Import routes and pass (app)


app.listen(port, () => {
    console.log("~~ You Are Now Listening to Port ***", port, "*** The App. The Dojo's Premier App Station!")
    console.log("~~ Get Your Backend Moving With Port ", port, " The App!")
})
