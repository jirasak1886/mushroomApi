const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();//ต้องเรียกใช้.env
// ConnectDB
mongoose.connect(process.env.MONGO_DB_URI, {
}).then(() => console.log('Mongo DB connected'))
.catch(err => console.log(err));

//config Route

const authRoute = require("./routes/auth");
const sensorRoute = require("./routes/sensor");

app.use("/api/auth",authRoute);
app.use("/api/sensor",sensorRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));