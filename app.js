const express=require("express");
const cors=require("cors");
const app=express();
const morgan=require("morgan");
// const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const config=require("./config/db");

mongoose
  .connect(config.database,{useNewUrlParser: true})
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({database_error: err});
  })

app.use(cors());
app.use(express.json());

// app.use("/uploads",express.static('uploads'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(morgan("dev"));

app.get("/",(req,res) => {
  console.log("server is connected !");
})

const userRoutes=require("./user/routes/user");
const issueRoutes=require("./issues/routes/issues")
const commentRoutes=require("./comments/routes/comments");

app.use("/api/user",userRoutes);
app.use("/api/issue",issueRoutes);
app.use("/api/comment",commentRoutes);

const PORT=process.env.PORT||3000;

app.listen(PORT,error => {
  if(error) {
    console.error(error.message);
    return;
  }

  console.log(`Server is running on port ${PORT}`);
})

module.exports=app;