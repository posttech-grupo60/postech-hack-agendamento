/* c8 ignore start */
import "dotenv/config";
import express from "express";
import usuarioRoute from "./routes/usuario";
import agendaRoute from "./routes/agenda";
import { connect } from "mongoose";
import envs from "./utils/envs";

const main = async () => {
  await connect(envs.MONGO_URI);
  console.log(envs.MONGO_URI);

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/login", usuarioRoute);
  app.use("/agenda", agendaRoute);


  app.listen(envs.PORT, async () => {
    console.log(`Server listen on port ${envs.PORT}`);
  });
};

main();