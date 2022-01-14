import mongoose from "mongoose";
import config from "./config.js";
import cron from 'node-cron';
import { storeData } from "./jobs/storeData.js";
const bootstrap = async (cb) => {
  try {
    console.log(config.MONGODB_URI);
    const db = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb is connected to", db.connection.host);

    cron.schedule('59 * * * * *', async function() {
      await storeData();
    });
    cb();
  } catch (error) {
    console.error(error);
  }
};

export default bootstrap;