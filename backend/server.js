// Start the server
// connect to the db

import app from "./src/app.js";
import dotenv from "dotenv";
import connectToDB from "./src/config/db.js";

dotenv.config();
connectToDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
