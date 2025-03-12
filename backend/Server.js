require("dotenv").config();

const app = require("./App.js");
const connectToDb = require("./configure/db.js");

connectToDb();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
