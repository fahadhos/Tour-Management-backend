/* eslint-disable no-console */
import {Server} from "http"
 
import mongoose  from "mongoose";

//  import dotenv from 'dotenv';
import app from "./app";
 import {envVars}from './app/config/env'
 
 
let server: Server;
 
const startServer= async()=>{

try{
   
    await mongoose.connect(envVars.DB_URL)
    // await mongoose.connect(`mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.xwjdlj9.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0`)
    // await mongoose.connect(``)


// console.log(envVars.NODE_ENV);
console.log("Connected to DB!!..");

server = app.listen(envVars.PORT,()=>{
    console.log(`Server listening to port ${envVars.PORT}`);
})
}
catch(error){
    console.log(error);
}

}


startServer()


process.on("SIGTERM", ()=>{
    console.log("SIGTERM signal received... Server shutting down..");

    if(server){
        server.close(()=>{
            
            process.exit(1)
        });
    }

    process.exit(1)
})
process.on("SIGINT", ()=>{
    console.log("SIGINT signal received... Server shutting down..");

    if(server){
        server.close(()=>{
            
            process.exit(1)
        });
    }

    process.exit(1)
})
process.on("unhandledRejection", ()=>{
    console.log("Unhandled Rejection detected... Server shutting down..");

    if(server){
        server.close(()=>{
            
            process.exit(1)
        });
    }

    process.exit(1)
})
process.on("uncaughtException", (err)=>{
    console.log("Uncaught Exception detected... Server shutting down..",err);

    if(server){
        server.close(()=>{
            
            process.exit(1)
        });
    }

    process.exit(1)
})
// Uncaught exception detected
// throw new Error("I forgot to handle this local error")
// Unhandled rejection detected
// Promise.reject(new Error("I forgot to catch this promise"))