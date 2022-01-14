// Read environment variables
import { config } from "dotenv";
config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const auth = `${username}:${password}`;
const hosts = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT || 27017;

const configurations = {
  PORT: process.env.PORT || 27017,  
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "oraklerdb",
  MONGODB_URI: `mongodb://${auth}@${hosts}:${port}/${
    process.env.MONGODB_DATABASE || "oraklerdb"
  }`,
};

export default configurations;