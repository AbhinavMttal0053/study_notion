const express = require("express");
const app = express();

const UserRoutes = require("./Routes/User");
const ProfileRoutes = require("./Routes/Profile");
// const PaymentRoutes = require("./Routes/Payments");
const CourseRoutes = require("./Routes/course");

const database = require("./Config/database");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const {cloudinaryConnect} = require("./Config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}))

cloudinaryConnect();

app.use("/api/v1/auth",UserRoutes);
// app.use("/api/v1/Payments",PaymentRoutes);
app.use("/api/v1/profile",ProfileRoutes);
app.use("/api/v1/course",CourseRoutes);

app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"Your Server is Up And Running",
    });
})

app.listen(PORT,() =>{
    console.log(`App is Running At Port ${PORT}`);
})