
import config from "./config.js";

import covensRoutes from "./routes/covens.js";
import sceptersRoutes from "./routes/scepters.js";
import wizardsRoutes from "./routes/wizards.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
// Initializations
const app = express();

// settings
app.set("port", config.PORT);

// middlewares
app.use(morgan("dev"));
app.use(cors({
  origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:3001'],
}));
app.use(express.urlencoded({ extended: false }));
// routes
app.use(covensRoutes);
app.use(sceptersRoutes);
app.use(wizardsRoutes);

app.use((req, res) => {
  res.send('hello from orakler mp api!');
});

export default app;
