import mongoose from "mongoose";
import { PERSISTENCE, MONGODB_CNX_STR } from '../config/config.js';

class DataBaseManager{
    constructor(){
        if(PERSISTENCE == 'MONGO'){
            this.connectToMongoDB();
        }
    }
}