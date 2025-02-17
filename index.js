const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Just added this
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Server is running")
})

//Connection to MongoDB
mongoose
	.connect("mongodb+srv://mynel_geva:Mynel04111226@expressnodedb.i8mka.mongodb.net/", {
        useNewURLParser: true,
		useUnifiedTopology: true,
    })
	.then(() => console.log("MongoDB Connected"))
	.catch((error) => {
		console.error("MongoDB Connection Error:", error.message);
		process.exist(1); //Exit if the database connection fails
});

//Middleware
app.use(cors());
app.use(express.json());

//Import API folder
const submitAuditionForm = require('./API/submit')

//Use API
app.use("/submit", submitAuditionForm);

// Start the server locally
//const PORT = 5000;

//app.listen(PORT, () => {
//    console.log(`Server is running on http://localhost:${PORT}`);
//});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Server running on port ${PORT}');
});