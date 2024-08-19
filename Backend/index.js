import express from "express";
import router from "./route/posts.js";
import cors from "cors";
import err from "./funs/not-found.js";
import { logger } from "./middleWares/logger.js";
import errorhandle from "./funs/error.js";
import "dotenv/config";

const API_URL = process.env.API_URL;
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ Hello: "message" });
});
app.use(API_URL, router);

app.use(err);
app.use(errorhandle);

app.listen(port, () => {
  console.log(`server running on Port: ${port}`);
});
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ugwucollins/Mern_Project.git
// git push -u origin main
