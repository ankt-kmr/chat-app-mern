const express = require("express");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dbConnect();

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000" 
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 7000;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})