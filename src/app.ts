// const express = require('express');
import { error } from 'console';
import express, { NextFunction, Request, Response } from 'express';
const app = express()
const port = 3000;

app.use(express.json());

const router = express.Router();
const courseRoute = express.Router();
app.use("/",router);
app.use("/",courseRoute);

router.get("/api/v1/users/create-user", (req:Request, res:Response)=>{
  const user = req.body;
  console.log(user);

  res.json({
    success:true,
    message:"Successful",
    data:user,
  });
})


courseRoute.post("/api/v1/courses/create-course", (req : Request, res:Response)=>{
  const data = req.body;
  console.log(data);

  res.json({
    success:true,
    message:"Data inserted",
    data:data,
  });
})

//middleware
const logger = (req : Request,res: Response,next:NextFunction)=>{
  console.log(req.url, req.method, req.hostname );
  next();
}

app.get('/', logger ,  (req :Request, res : Response , next:NextFunction ) => {
  try {
    console.log(req.query);
  res.send('Hello World!')
  } catch (error) {
    console.log(error);
    // res.status(400).json({
    //   success:false,
    //   message:"Go somewhere else"
    // });

    //global error handling
    next(error);
    
  }
})

app.post('/', (req :Request, res : Response ) => {
    console.log(req.body)
    res.send('Data de!!');
})


app.all('*',(req :Request , res:Response )=>{
  res.status(400).json({
    success:false,
    message:"ja vag"
  })
});

//global error handling
app.use((error:any, req:Request, res:Response , next:NextFunction)=>{
  if(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Fraud"
    });
  }
})


export default app;