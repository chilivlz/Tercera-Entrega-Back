import { connect } from "mongoose";
import { ent } from "../config.js";

export async function connectMongo(){
    try {
      await connect (ent.MONGO_URL
      );
      console.log("plug to mongo!");
    } catch (e){
      console.log(e);
      throw  new Error ("can not connect to the db :/");
    }
  }
  