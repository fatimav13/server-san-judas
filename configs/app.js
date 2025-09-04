'use strict';

import express from 'express';
import cors from 'cors'; 
import helmet from 'helmet'; 
import morgan from 'morgan'; 

import 'dotenv/config'; 

const middlewares = (app) => {
    app.use(express.json()); 
    app.use(express.urlencoded({extended: false}))
    app.use(cors()); 
    app.use(helmet()); 
    app.use(morgan('dev')); 
}

const initServer = () => {
    const app = express(); 

    try{
        app.listen(process.env.PORT, () => {
            console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
        })
    }catch(error){
        console.log(`Error al iniciar el servidor: ${error}`);
    }
}