import { Sequelize } from "sequelize";
const sequelize = new Sequelize("myapp", "user", "password", {
  host: "mysql",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Success test connection");
  })
  .catch((error: any) => {
    console.log("Failure test connection", error);
  });

export default sequelize;
