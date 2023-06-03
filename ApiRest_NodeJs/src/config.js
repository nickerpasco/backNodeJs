import { config } from "dotenv";
config();

console.log(process.env.NICKNAME)

export default {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "sa",
  dbPassword: process.env.DB_PASSWORD || "royal2019",
  dbServer: process.env.DB_SERVER || "40.88.0.67",
  dbServerPort: process.env.DB_SERVER_POR || 50676,
  dbDatabase: process.env.DB_DATABASE || "SPRING_CPT",
};
